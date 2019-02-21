import { Component } from '@angular/core';
import { LoginService } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  styles: ['.hidden {display: none}'],
})
export class LoginComponent {
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
    }
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

  constructor(private loginService: LoginService) {
  }

  login() {
    this.sendUserAuthData();
  }

}
