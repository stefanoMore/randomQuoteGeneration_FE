import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {compareValidator} from "../../utils/compareValidator";
import {AuthService} from "../../../services/server/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm = this.fb.group({
    email:['', [Validators.email, Validators.required]],
    confirmEmail: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  },{
    validators: [compareValidator('email', 'confirmEmail'),compareValidator('password', 'confirmPassword')]
  })

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
  }

  async register() {
    this.authService.register({
      email:this.registerForm.value.email,
      password: this.registerForm.value.password
    })

  }
}
