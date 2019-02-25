import { Component, OnInit, NgZone } from '@angular/core';

import { Router } from '@angular/router';
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
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) {}

  sendUserAuthData() {
    this.loginData = {
      username: this.username,
      password: this.password
    };
    this.isSubmitted = true;
    this.authService.login(this.username, this.password);
  }

  // sendUserAuthData() {
  //   this.isSubmitted = true;
  //   this.loginService.postData(this.loginData)
  //   .subscribe(
  //     () => {
  //     this.isSubmitted = false;
  //     this.isSuccess = true;
  //   },
  //     (error) => {
  //       console.log(error.status);
  //       if (error.status === 0) {
  //         this.errorMessage = 'There were problems with the Server connection';
  //       } else if (error.status === 401) {
  //         this.errorMessage = 'Please check you login data!';
  //       } else {
  //         this.errorMessage = 'Something went wrong :(';
  //       }
  //       this.isSubmitted = false;
  //       this.isFail = true;
  //   });
  // }


  login() {
    this.sendUserAuthData();
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(value => {
      if (value) {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }



}
