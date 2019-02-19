import { Component } from '@angular/core';
import { TestRequest } from './login.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  dataReceived: any;
  username: string;
  password: string;
  loginDisabled = 'true';

  getJsonData() {
    this.testRequest.getJSON()
    .subscribe(data => this.dataReceived = data)
  }


  constructor(private testRequest: TestRequest) {
    this.getJsonData();
  }

  // activate() {
  //   if(this.username.length === 0 && this.password.length === 0)
  //   this.loginDisabled = 'false';
  // }

// ngOnInit() {
//   this.activate();
// }


  login() {
    console.log(this.dataReceived, this.username, this.password);
  }

}
