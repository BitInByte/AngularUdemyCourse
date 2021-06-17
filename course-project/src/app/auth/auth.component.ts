import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  // store if the user is currently in login
  // or signup mode and we adjust the UI but
  // also what we do in the form gets submitted
  // dynamically based this property.
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  // Will find the first occurrence of this directive
  // in the DOM
  @ViewChild(PlaceHolderDirective, { static: false })
  alertHost: PlaceHolderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  onSwitchMode() {
    // reverse the value
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    // console.log(form.value);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
      // this.authService.signup(email, password).subscribe(
      // (resData) => {
      // console.log(resData);
      // this.isLoading = false;
      // },
      // (errorMessage) => {
      // console.log(errorMessage);
      // // switch (errorRes.error.error.message) {
      // // case 'EMAIL_EXISTS':
      // // this.error = 'This email exists already!';
      // // }
      // this.error = errorMessage;
      // this.isLoading = false;
      // }
      // );
    }

    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        // switch (errorRes.error.error.message) {
        // case 'EMAIL_EXISTS':
        // this.error = 'This email exists already!';
        // }
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  private showErrorAlert(message: string) {
    // We need to use the component factory
    // to instantiate our component
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // viewContainerRef is an object that allows us to interact
    // with the place in the DOM where this directive lives
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    // Clear everything we may have already in that directive in the DOM
    hostViewContainerRef.clear();

    // Create a new alert in that directive reference
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    // The instance should have the properties we added
    // to our component
    componentRef.instance.message = message;

    // EventEmitter is based on rxjs so, we can use
    // subscribe here to listen to our @Output event
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
