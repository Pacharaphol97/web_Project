import { Component, OnInit } from '@angular/core';
import { AuthService } from "../services/auth/auth.service";
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private auth: AuthService,
  ) {
    auth.getCurrentLoggedIn();
   }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.pattern('^(?=.*[0–9])(?=.*[a-zA-Z])([a-zA-Z0–9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ])
    });
  }

  signin(): void {
    this.auth.emailLogin(this.signinForm.value.email, this.signinForm.value.password)
    }

}
