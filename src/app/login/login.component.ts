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
  public loginDisabled = "true";
  public isLoading = false;
  public errorMessage = "";

  constructor(
    private router: Router,
    private authService: AuthService,
    private ngZone: NgZone,
  ) {}

  public login() {
    this.isLoading = true;
    this.authService.login({ emailLogin: this.username, password: this.password })
      .subscribe(
        () => this.isLoading = false,
        (err) => {
          this.isLoading = false;
          const regExp = new RegExp(/^[4]/g);
          if (regExp.test(err.status)) {
            this.errorMessage = "Bad credentials login or password is wrong.";
          } else {
            this.errorMessage = "Some problems occurs in the server, please contact administrator";
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
