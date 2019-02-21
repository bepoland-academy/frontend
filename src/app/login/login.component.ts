import { Component, OnInit } from '@angular/core';

import { LoginService } from './login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: ['.hidden {display: none}'],
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  loginDisabled = 'true';
  isSubmitted = false;
  isSuccess = false;
  isFail = false;
  loginData: object;

  sendUserAuthData() {
    this.loginData = {
     username: this.username,
     password: this.password
    };
    this.isSubmitted = true;
    this.loginService.postData(this.loginData)
    .subscribe(
      () => {
      this.isSubmitted = false;
      this.isSuccess = true;
    },
      () => {
      this.isSubmitted = false;
      this.isFail = true;
    });
  }

  constructor(
    private loginService: LoginService,
    private router: Router,
    private authService: AuthService
    ) {
  }

  ngOnInit(): void {
    console.log(this.authService.loggedIn.getValue());
    if (this.authService.loggedIn.getValue()) {
      this.router.navigate(['/']);
    }
  }

  login() {
    this.sendUserAuthData();
    this.authService.login();
    this.router.navigate(['/']);
  }

}
