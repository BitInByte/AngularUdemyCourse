import {
  HttpClient,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // user = new Subject<User>();
  // BehaviorSubject allows us to specify an
  // initial value since it emit the last
  // value
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    // this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxzRCftCtfydNAZp8fmQzaVTG5uJLaYXQ
    // ', {
    // this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCxzRCftCtfydNAZp8fmQzaVTG5uJLaYXQ', {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp',
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          params: new HttpParams().set(
            'key',
            'AIzaSyCxzRCftCtfydNAZp8fmQzaVTG5uJLaYXQ'
          ),
        }
      )
      .pipe(
        // catchError((errorRes) => {
        // let errorMessage = 'An unknown error occurred!';

        // if (!errorRes.error || !errorRes.error.error) {
        // return throwError(errorMessage);
        // }

        // switch (errorRes.error.error.message) {
        // case 'EMAIL_EXISTS':
        // errorMessage = 'This email exists already!';
        // }
        // return throwError(errorMessage);
        // })
        catchError(this.handleError),
        // tap doesn't block or change the observable,
        // it just run some code with the data we get back
        // from the observable
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword',
        {
          email,
          password,
          returnSecureToken: true,
        },
        {
          params: new HttpParams().set(
            'key',
            'AIzaSyCxzRCftCtfydNAZp8fmQzaVTG5uJLaYXQ'
          ),
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    // We can't save getters and methods in a JSON format
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    // If our getter get a user, we are logged in
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // expirationDuration is the amount of milliseconds
  // we have until the token is invalid
  autoLogout(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    // * 1000 gives us the time int milliseconds
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already!';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct!';
        break;
    }
    return throwError(errorMessage);
  }
}
