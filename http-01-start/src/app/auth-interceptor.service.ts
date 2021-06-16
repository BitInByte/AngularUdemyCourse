import {
  HttpEvent,
  HttpEventType,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Do some logic before the request leaves the app
    // console.log("Request is on its way!");
    // console.log(req.url);
    // request object is immutable, so, we need to
    // clone it
    const modifiedRequest = req.clone({
      headers: req.headers.append("Auth", "xyz"),
    });
    // Let the request leave the app
    // return next.handle(req);
    // The handle returns an observable which we
    // can use to manipulate the response
    return next.handle(modifiedRequest).pipe(
      tap((event) => {
        console.log(event);
        // Here, in the interceptor, we always
        // get an event so that we have the most
        // granular access to the response we
        // could possibly have.
        if (event.type === HttpEventType.Response) {
          // console.log("Response arrived, body data: ");
          // console.log(event.body);
        }
      })
    );
  }
}
