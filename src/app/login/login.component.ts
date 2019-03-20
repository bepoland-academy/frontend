import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
   username: string;
   password: string;
   isLoading = false;
   errorMessage = '';

  constructor(
   private router: Router,
   private authService: AuthService,
   private ngZone: NgZone
  ) {}

   login(): void {
    this.isLoading = true;
    this.authService.login({ username: this.username, password: this.password })
      .subscribe(
        () => this.isLoading = false,
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

   ngOnInit(): void {
    this.authService.loggedIn.subscribe((value: boolean) => {
      if (value) {
        this.ngZone.run(() => {
        this.router.navigate(['/']);
      });
      }
    });
  }

 }
