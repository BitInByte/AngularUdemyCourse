import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  // receives the current active route and
  // the router state snapshot
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.user.pipe(
      // take to unsubscribe automatically to this event
      take(1),
      map((user) => {
        // return !!user;
        // We can return a UrlTree which automatically
        // redirect the user if the condition is false
        const isAuth = !!user;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
      // We have a better approach using the UrlTree
      // tap((isAuth) => {
      // if (!isAuth) {
      // this.router.navigate(['/auth']);
      // }
      // })
    );
  }
}
