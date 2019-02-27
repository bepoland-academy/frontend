import { Component, NgZone, OnInit } from '@angular/core';
 
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
 
 @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
 })
 export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public loginDisabled = "true";
  public isSubmitted = false;
  public isSuccess = false;
  public isFail = false;
  public errorMessage = "";
 
  constructor(
   private router: Router,
   private authService: AuthService,
   private ngZone: NgZone,
  ) {}
 
  public sendUserAuthData() {
   this.isSubmitted = true;
   this.authService.login({
    emailLogin: this.username,
    password: this.password
   });
  }
 
  public login() {
   this.sendUserAuthData();
  }
 
  public ngOnInit(): void {
   this.authService.loggedIn.subscribe((value) => {
    if (value) {
     this.ngZone.run(() => {
      this.router.navigate(["/"]);
     });
    }
   });
  }
 
 }