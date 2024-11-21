import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginObj: Login;
  hasError: boolean;

  emailPattern = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
  
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(this.emailPattern)]],
      password: [null, [Validators.required]]
    });
  }

  onLogin() {
    this.hasError = false;
    this.loginForm.markAllAsTouched();
    const obj: Login = {
      ...this.loginForm.value,
    }
    if(this.loginForm.valid) {
      this.loginService.login(obj).subscribe(() => {
        this.router.navigate(['home']);
      }, () => {
        this.hasError = true;
      });
    }
  }
}
