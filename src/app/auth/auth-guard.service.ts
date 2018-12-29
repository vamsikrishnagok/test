import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router) {}
  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  //   return this.authService.isAuthenticated();
  // }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

    if (state.url !== '/login' && !this.authService.isAuthenticated()) {
      this.router.navigate(['/signin']);
      return false;
    }
    return true;
  }
}
