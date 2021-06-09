import { Component, OnDestroy, OnInit } from "@angular/core";

import { interval, Subscription, Observable, Observer } from "rxjs";
import { map, filter } from "rxjs/operators";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSubscription: Subscription;

  constructor() {}

  ngOnInit() {
    // Similar with setInterval
    // this.firstObsSubscription = interval(1000).subscribe((count) => {
    // console.log(count);
    // });
    const customIntervalObservable = Observable.create(
      (observer: Observer<number>) => {
        let count = 0;
        // The observer is, in the end, the part that is
        // interested in being informed about new data, about
        // errors or about the observable being completed.
        // We're not responsible for listening because,
        // the observer is the listener.
        setInterval(() => {
          // We can call next to emit a new value
          observer.next(count);
          if (count == 5) {
            // This is how we can complete an observable
            observer.complete();
          }
          if (count > 3) {
            // We can also call error to emit a new error
            // Whenever it encounter an error, it will cancel
            // the event
            observer.error(new Error("Count is greater 3!"));
          }
          count++;
        }, 1000);
      }
    );

    this.firstObsSubscription = customIntervalObservable
      // To use observables we use the method called pipe
      // Every observable has a pipe method
      // If we have more than 1 pipe, we simply add it as
      // argument with a coma dividing them.
      // They will execute after each other
      .pipe(
        filter((data: number) => {
          return data > 0;
        }),
        map((data: number) => {
          return "Round: " + (data + 1);
        })
      )
      .subscribe(
        // This is how we can listen to new events
        (data) => {
          console.log(data);
        },
        // This is how we can listen to errors
        (error) => {
          console.log(error);
          alert(error.message);
        },
        // This is how we can listen to completion
        // It's a good function to do some cleanup
        // work for example
        () => {
          console.log("Completed!");
        }
      );
  }

  ngOnDestroy(): void {
    // We clear the subscription, whenever we leave this component
    // We don't need to unsubscribe if our observable got completed
    // or if it returned an error, but, we can do it with no problem
    // we might not know if this can complete or return an error
    this.firstObsSubscription.unsubscribe();
  }
}
