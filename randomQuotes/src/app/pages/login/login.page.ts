import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {IonicModule, NavController} from '@ionic/angular';
import {RouterModule} from "@angular/router";
import {AuthService} from "../../../services/server/auth.service";
import {TokenService} from "../../../services/server/token.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule, ReactiveFormsModule]
})
export class LoginPage{
  loginForm = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private navController: NavController,
              private tokenService: TokenService) { }


  login() {
    this.authService.login({email: this.loginForm.value.email, password: this.loginForm.value.password})
      .subscribe({
      next:() => {
        this.tokenService.setToken();
        this.tokenService.getDecodedToken();
        this.tokenService.getExpiryTime();
        this.tokenService.getUserMail();
        this.tokenService.isTokenExpired();
        this.navController.navigateForward('/home').then();

      }
    })
  }
}
