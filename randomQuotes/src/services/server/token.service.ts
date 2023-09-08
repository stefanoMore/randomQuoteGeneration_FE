import { Injectable } from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {HttpClient} from "@angular/common/http";
import {quoteResponse, tokenResponse} from "../../core/models/http-response";
import {environment} from "../../environments/environment";
import {share} from "rxjs";

import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private basePath = environment.serverUrl;
  jwtToken: string | null = null;
  decodedToken: any = {}
  constructor(private cookieService:CookieService, private http: HttpClient) {}

  getToken() : string | null {
    return this.cookieService.get('jwt');
  }
  setToken(){
    const token = this.getToken()
    if(token){
      this.jwtToken = token;
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }
  getDecodedToken(){
    return this.decodedToken
  }

  getExpiryTime(){
    return this.decodedToken.exp;
  }

  getUserMail(){
    const payloadToken = this.decodedToken.id;
    return payloadToken.user.email
  }

  isTokenExpired(): boolean{
    const expTime: number = this.getExpiryTime();
    if(expTime){
      return ((1000 * expTime) - (new Date().getTime())) < 5000;
    }else{
      return true
    }
  }

}
