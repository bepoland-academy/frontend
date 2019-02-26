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
  canActivate(): boolean {
    const isLoggedIn: boolean = this.authService.loggedIn.getValue();
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

