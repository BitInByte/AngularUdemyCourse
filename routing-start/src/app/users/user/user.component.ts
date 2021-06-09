import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.user = {
      // This is how we can retrieve params
      // from our route
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };

    // The difference between snapshot and params is that params
    // is an observable and with the observable, we can
    // subscribe to some event which will then react
    // This code will not be executed when ngOnInit runs
    // through, the subscription will set up but only if
    // the parameters then changed, only in this case,
    // we will exchange them in our user object
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }

  ngOnDestroy() {
    // We don't have to unsubscribe to the event manually,
    // Angular should deal with this for us, but, if we add
    // our own observables, we have to unsubscribe on our own,
    // but, the routes observables, Angular handles is for us
    this.paramsSubscription.unsubscribe();
  }
}
