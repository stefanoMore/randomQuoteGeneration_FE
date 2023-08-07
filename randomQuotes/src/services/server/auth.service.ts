import {Injectable, OnInit, signal} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {quoteResponse} from "../../core/models/http-response";
import {User} from "../../core/models/user";
import {environment} from "../../environments/environment";
import {body} from "ionicons/icons";
import {share} from "rxjs";
import {NavController} from "@ionic/angular";


@Injectable({
  providedIn: 'root'
})
export class AuthService{
  private basePath = environment.serverUrl;



  constructor(private http:HttpClient,
              private navController: NavController) {}


  login(loginData: {email: string | null | undefined, password: string | null | undefined}){
    const req = this.http.post<quoteResponse<User>>(`${this.basePath}/login`,{email: loginData.email, password:loginData.password}, {withCredentials: true}).pipe(share());
    req.subscribe({
      next:() => {
        this.navController.navigateForward('/home').then();

    }
    })
  }


  register(registerData: { password: string | null | undefined; email: string | null | undefined }){
    const req = this.http.post<quoteResponse<User>>(`${this.basePath}/register`, {...registerData}).pipe(share());
    req.subscribe({
      next: () => {
        this.navController.navigateForward('/login').then();
      }
    })
  }

  verifyToken(token:string){
    return this.http.post<any>(`${this.basePath}/token/verify`,{token}).pipe(share()).subscribe({
    next:(res) => {
      console.log(res)
    }
    })
    }

}


