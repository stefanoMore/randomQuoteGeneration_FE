import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {quoteResponse} from "../../core/models/http-response";
import {User} from "../../core/models/user";
import {environment} from "../../environments/environment";
import {body} from "ionicons/icons";
import {share} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private basePath = environment.serverUrl;

  constructor(private http:HttpClient) { }


  login(){
    const req = this.http.get<quoteResponse<User>>(`${this.basePath}/quote`,).pipe(share());
    req.subscribe({
      next: (res) => {
        console.log(res)

    }
    })

    return req
  }
}


