import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class IsAuthGuard implements CanActivate, CanActivateChild {
  constructor(private auhServ: AuthService, private router: Router) {}
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean
     {
    return this.CheckUserAuth();
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.CheckUserAuth();
    }
  CheckUserAuth() {
    const isLoggedIn = this.auhServ.isLoggedIn();
    if (isLoggedIn) {
      return true;
    } else {
      this.auhServ.LogOut();
      return false;
    }
  }
}
