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

  sendUserAuthSata() {
    this.isSubmitted = true;
    this.testRequest.postData()
    .subscribe(data => 
      {console.log("Request is successful", data);
      this.isSubmitted = false;
      this.isSuccess = true;
    },
    error => {
      console.log("Error", error);
      this.isSubmitted = false;
      this.isFail = true;
    })
  }

  constructor(private testRequest: TestRequest) {
  }

  login() {
    console.log('hey');
    this.sendUserAuthSata();
  }

}
