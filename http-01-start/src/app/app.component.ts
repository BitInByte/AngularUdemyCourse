import { Component, OnDestroy, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./post.model";
import { PostsService } from "./posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.errorSub = this.postsService.error.subscribe((errorMessage) => {
      this.error = errorMessage;
    });
    this.isFetching = true;
    // this.fetchPosts();
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      (error) => {
        // By default our error object have a property
        // named error.message
        this.isFetching = false;
        this.error = error.message;
        console.log(error);
      }
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // console.log(postData);
    // The first argument is the url.
    // The second argument is the request body.
    // this.http
    // .post<{ name: string }>(
    // "https://ng-complete-guide-a2c75-default-rtdb.firebaseio.com/posts.json",
    // postData
    // )
    // // Angular, the HttpClient, forces us to subscribe to
    // // the Http event. If we don't subscribe to it, Angular
    // // will not send the HTTP request, since no one will need it
    // .subscribe((responseData) => {
    // console.log(responseData);
    // });
    this.postsService.createAndStorePost(postData.title, postData.content);
  }

  onFetchPosts() {
    // Send Http request
    // this.fetchPosts();
    this.isFetching = true;
    // this.fetchPosts();
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.isFetching = false;
        this.loadedPosts = posts;
        // We have access to a second argument
        // which will be the error in
        // case we encounter one
      },
      (error) => {
        this.isFetching = false;
        // By default our error object have a property
        // named error.message
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  // private fetchPosts() {
  // this.isFetching = true;
  // this.http
  // // The generic type here tells the what this response
  // // will return as a body once it's done
  // .get<{ [key: string]: Post }>(
  // "https://ng-complete-guide-a2c75-default-rtdb.firebaseio.com/posts.json"
  // )
  // // Pipe allows us to funnel our observable
  // // data through multiple operators before they reach
  // // the subscribe method.
  // .pipe(
  // // map operator allow us to get some data and return
  // // new data which is then automatically re-wrapped into
  // // an observable so that we can still subscribe to it.
  // // map((responseData: { [key: string]: Post }) => {
  // // Instead we can use a generic type in our get method
  // map((responseData) => {
  // // Convert an object into an array
  // const postsArray: Post[] = [];
  // for (const key in responseData) {
  // // It's a good practice to wrap with an if statement
  // // if we're using for/in loop where we check if
  // // responseData has a key as its own property so
  // // that we're not trying to access the property
  // // of some prototype
  // if (responseData.hasOwnProperty(key)) {
  // postsArray.push({
  // ...responseData[key],
  // id: key,
  // });
  // }
  // }
  // return postsArray;
  // })
  // )
  // .subscribe((posts) => {
  // this.isFetching = false;
  // // console.log(posts);
  // this.loadedPosts = posts;
  // });
  // }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
