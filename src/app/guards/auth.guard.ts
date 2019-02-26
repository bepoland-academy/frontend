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

    if (this.authService.loggedIn.getValue()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

