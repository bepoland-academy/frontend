import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  loggedIn: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(): any {

    //  return this.authService.getLogStatus().pipe(map((isLogged) => console.log(isLogged)));
    // return this.authService.loggedIn.subscribe(val => {
    //   if (val) {
    //     return true;
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    // });
    if (this.authService.loggedIn.getValue()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

