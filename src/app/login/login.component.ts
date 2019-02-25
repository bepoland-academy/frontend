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
  errorMessage = '';

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
      (error) => {
        console.log(error.status);
        if (error.status === 0) {
          this.errorMessage = 'There were problems with the Server connection';
        } else if (error.status === 401) {
          this.errorMessage = 'Please check you login data!';
        } else {
          this.errorMessage = 'Something went wrong :(';
        }
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
