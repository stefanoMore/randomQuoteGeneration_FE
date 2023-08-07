import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {AuthService} from "../../services/server/auth.service";
import {NavController} from "@ionic/angular";
import {CookieService} from "ngx-cookie-service";

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const navController = inject(NavController);
  const cookieService = inject(CookieService)

  const token = cookieService.get('jwt')
  console.log(token)

  if(!token) {
    //navController.navigateBack(['login']).then();
    return false
  }

  const prova = authService.verifyToken(token)

  return true
};

