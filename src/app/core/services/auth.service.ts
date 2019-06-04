import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { NavigationService } from './navigation.service';
import { User } from '../../core/models';

@Injectable()
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private navigationService: NavigationService
  ) {
    this.getUser();
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }

  getUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.callServices(user.roles);
    }
  }

  callServices(roles: Array<string>) {
    this.navigationService.filterRoutes(roles);
    this.loggedIn.next(true);
  }
}
