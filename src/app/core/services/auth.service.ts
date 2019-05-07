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

  login(credentials: Credentials): Observable<HttpResponse<User>> {
    return this.http
      .login('auth/login', credentials, { observe: 'response' as 'body' })
      .pipe(
        tap((response: HttpResponse<User>) => {
          localStorage.setItem('user', JSON.stringify(response.body));
          this.callServices(response.body);
        })
      );
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }

  getUser(): void {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      return;
    }
    if (user) {
      this.callServices(user);
    }
  }

  callServices(user: User) {
    this.navigationService.filterRoutes(user.roles);
    this.loggedIn.next(true);
    this.http.fetchProjects();
  }
}
