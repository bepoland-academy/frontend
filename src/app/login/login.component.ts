import {
  Component, NgZone, OnInit, ViewChild
 } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { AuthService } from '../core/services/auth.service';
import { HttpService } from '../core/services/http.service';
import { HttpResponse } from '@angular/common/http';
import { User, UsersResponse } from '../core/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @ViewChild('myForm') loginForm: NgForm;
  username: string;
  password: string;
  isLoading = false;
  errorMessage = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
    private httpService: HttpService
  ) { }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((isLoggedIn: boolean) => {
      if (isLoggedIn) {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      }
    });
  }

  login(): void {
    this.isLoading = true;
    this.httpService
      .login({ username: this.username, password: this.password })
      .subscribe(
        (response: HttpResponse<User>) => {
          const token: string = response.headers.get('Authorization');
          localStorage.setItem('token', JSON.stringify(token));

          // getting one more time users information coz of UTF-8 is not working correctly with JWT
          this.httpService.get(`users/${response.body.userId}`)
            .subscribe((user: User) => {
              localStorage.setItem('user', JSON.stringify(user));
              this.isLoading = false;
              this.authService.callServices(user.roles);
            });
        },
        (err) => {
          this.isLoading = false;
          if ((/^[4]\d/g).test(err.status)) {
            this.errorMessage = 'Please check your username(email) or password';
          } else if ((/^[5]/g).test(err.status)) {
            this.errorMessage = `Oh no! Something bad happened.
            Please come back later when we fixed that problem. Thanks`;
          } else {
            this.errorMessage = 'Please check your Internet connection';
          }
        }
      );
  }

}
