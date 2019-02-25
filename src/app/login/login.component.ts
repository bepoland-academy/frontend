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

  sendUserAuthData() {
    this.loginData = {
      username: this.username,
      password: this.password
    };
    this.isSubmitted = true;
    this.authService.login(this.username, this.password);
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone
  ) {
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

  login() {
    this.sendUserAuthData();
  }

}
