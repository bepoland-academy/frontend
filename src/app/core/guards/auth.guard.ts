import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  // Use of Public/Private modifiers to determine if the method/property is accessible from outside 
  privateloggedIn: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  canActivate(): boolean {
    const isLoggedIn: boolean = this.authService.loggedIn.getValue();
    // You can use ternary operator -> condition ? true : false;
    // return isLoggedIn ? true : this.router.navigate(['/login']);
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      // return false;
    }
  }
}
