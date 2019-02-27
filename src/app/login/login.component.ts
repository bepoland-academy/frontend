import { Component, NgZone, OnInit } from "@angular/core";

import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  public username: string;
  public password: string;
  public isLoading = false;
  public errorMessage = '';

  constructor(
   private router: Router,
   private authService: AuthService,
   private ngZone: NgZone,
  ) {}

  public login(): void {
    this.isLoading = true;
    this.authService.login({ emailLogin: this.username, password: this.password })
      .subscribe(
        () => this.isLoading = false,
        (err) => {
          this.isLoading = false;
          if ((/^[4]/g).test(err.status)) {
            this.errorMessage = "Bad credentials login or password is wrong.";
          } else if ((/^[5]/g).test(err.status)) {
            this.errorMessage = "Some problems occur in the server, please contact administrator";
          } else {
            this.errorMessage = "Check your internet connection"
          }
        },
      );
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
