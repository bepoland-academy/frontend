import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  loggedIn: boolean;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  canActivate(): any {

  //  return this.authService.getLogStatus().pipe(map((isLogged) => console.log(isLogged)));

    if (this.authService.loggedIn.getValue()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

