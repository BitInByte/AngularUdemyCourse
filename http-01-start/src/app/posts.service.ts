import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

// More modern and recommended approach using the Injectable
// instead of adding it to the providers array in the module
@Injectable({ providedIn: "root" })
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    // Send Http request
    // console.log(postData);
    // The first argument is the url.
    // The second argument is the request body.
    this.http
      .post<{ name: string }>(
        "https://ng-complete-guide-a2c75-default-rtdb.firebaseio.com/posts.json",
        postData,
        {
          observe: "response",
        }
      )
      // Angular, the HttpClient, forces us to subscribe to
      // the Http event. If we don't subscribe to it, Angular
      // will not send the HTTP request, since no one will need it
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  fetchPosts() {
    // If we want to set multiple params
    let searchParams = new HttpParams();
    searchParams = searchParams.append("print", "pretty");
    searchParams = searchParams.append("custom", "key");
    return (
      this.http
        // The generic type here tells the what this response
        // will return as a body once it's done
        .get<{ [key: string]: Post }>(
          "https://ng-complete-guide-a2c75-default-rtdb.firebaseio.com/posts.json",
          {
            headers: new HttpHeaders({ "Custom-Header": "Hello" }),
            // params: new HttpParams().set("print", "pretty"),
            // This is how we can set multiple params
            params: searchParams,
          }
        )
        // Pipe allows us to funnel our observable
        // data through multiple operators before they reach
        // the subscribe method.
        .pipe(
          // map operator allow us to get some data and return
          // new data which is then automatically re-wrapped into
          // an observable so that we can still subscribe to it.
          // map((responseData: { [key: string]: Post }) => {
          // Instead we can use a generic type in our get method
          map((responseData) => {
            // Convert an object into an array
            const postsArray: Post[] = [];
            for (const key in responseData) {
              // It's a good practice to wrap with an if statement
              // if we're using for/in loop where we check if
              // responseData has a key as its own property so
              // that we're not trying to access the property
              // of some prototype
              if (responseData.hasOwnProperty(key)) {
                postsArray.push({
                  ...responseData[key],
                  id: key,
                });
              }
            }
            return postsArray;
          }),
          // Similar with map, but in this case, we are
          // manipulating the error response instead
          // of the request response
          catchError((errorResponse) => {
            // Send to analytics server
            return throwError(errorResponse);
          })
        )
    );
  }

  deletePosts() {
    return this.http
      .delete(
        "https://ng-complete-guide-a2c75-default-rtdb.firebaseio.com/posts.json",
        {
          observe: "events",
          responseType: "text",
        }
      )
      .pipe(
        // Tap is like subscribe but it doesn't effect
        // the subscribe, it's for logging functionality
        // it just taps in there, allows us to do something
        // but then automatically lets the response pass through
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            // We could update something in the UI to basically
            // inform the user that request was sent and we're
            // waiting for the response.
            console.log(event.type);
          }
          if (event.type === HttpEventType.Response) {
            console.log(event.body);
          }
          // console.log(event);
        })
      );
  }
}
