import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NavigationService } from './navigation.service';
import { HttpService } from './http.service';
import { User, Credentials } from '../../core/models';

@Injectable()
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private navigationService: NavigationService,
    private http: HttpService
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
    this.http.getProjectsAndClients();
  }
}
