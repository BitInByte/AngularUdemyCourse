import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  // store if the user is currently in login
  // or signup mode and we adjust the UI but
  // also what we do in the form gets submitted
  // dynamically based this property.
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

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
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
