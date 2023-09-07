import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, UrlTree} from '@angular/router';
import {AuthService} from "../../services/server/auth.service";
import {NavController} from "@ionic/angular";
import {CookieService} from "ngx-cookie-service";
import {TokenService} from "../../services/server/token.service";


export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const navController = inject(NavController);
  const cookieService = inject(CookieService)
  const tokenService = inject(TokenService)

  const token = tokenService.setToken();
  const isTokenExpired = tokenService.isTokenExpired()

  if(tokenService.jwtToken !== null ){
    return isTokenExpired ?  navController.navigateBack(['login']).then() : true;
  }else{
    navController.navigateBack(['login']).then()
    return  false
  }
};

