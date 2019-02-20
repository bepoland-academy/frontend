import { Component } from '@angular/core';
import { TestRequest } from './login.service';


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

  sendUserAuthSata() {
    this.loginData = {
     username: this.username,
     password: this.password
    }
    this.isSubmitted = true;
    this.testRequest.postData(this.loginData)
    .subscribe(data => {
      this.isSubmitted = false;
      this.isSuccess = true;
    },
    error => {
      this.isSubmitted = false;
      this.isFail = true;
    })
  }

  constructor(private testRequest: TestRequest) {
  }

  login() {
    this.sendUserAuthSata();
  }

}
