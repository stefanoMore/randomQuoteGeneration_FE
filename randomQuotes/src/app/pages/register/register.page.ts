import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {compareValidator} from "../../utils/compareValidator";
import {AuthService} from "../../../services/server/auth.service";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {
  registerForm = this.fb.group({
    name: ['', [Validators.required]],
    surname: ['', [Validators.required]],
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
    const user: User = {
      name: this.registerForm.value.name || '',
      surname: this.registerForm.value.surname || '',
      email:this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      dateOfBirth: new Date()
    }
    this.authService.register(user);
  }
}
