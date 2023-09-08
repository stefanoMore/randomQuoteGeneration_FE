import {Injectable, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {quoteResponse, tokenResponse} from "../../core/models/http-response";
import {User} from "../../core/models/user";
import {environment} from "../../environments/environment";
import {share} from "rxjs";
import {NavController} from "@ionic/angular";
import {CookieService} from "ngx-cookie-service";
import jwt_decode from 'jwt-decode';
import {TokenService} from "./token.service";



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath = environment.serverUrl;
  public $isLogged = signal<boolean>(false);


  constructor(private http: HttpClient,
              private navController: NavController,
              private cookieService: CookieService,
              private tokesService: TokenService) {
  }


  login(loginData: { email: string | null | undefined, password: string | null | undefined }) {
    return this.http.post<quoteResponse<User>>(`${this.basePath}/login`,
      {email: loginData.email, password: loginData.password},
      {withCredentials: true})
      .pipe(share());
  }

  logout() {
    this.cookieService.delete('jwt')
    this.navController.navigateForward('/login').then();
  }


  register2(registerData: {
    password: string | null | undefined;
    email: string | null | undefined,
    name: string | null | undefined,
    surname: string
  }) {
    const req = this.http.post<quoteResponse<User>>(`${this.basePath}/register`, {...registerData}).pipe(share());
    req.subscribe({
      next: () => {
        this.navController.navigateForward('/login').then();
      }
    })
  }


  register(registerData: User) {
    const req = this.http.post<quoteResponse<User>>(`${this.basePath}/signUp`, {...registerData}).pipe(share());
    req.subscribe({
      next: () => {
        this.navController.navigateForward('/login').then();
      }
    })
  }

}
