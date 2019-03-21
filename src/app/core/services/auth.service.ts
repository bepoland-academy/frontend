import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NavigationService } from './navigation.service';
import { HttpService } from './http.service';
import { User, Credentials } from '../../core/models';

const defaultUser = {} as User;

@Injectable()
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  user: BehaviorSubject<User> = new BehaviorSubject(defaultUser);

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
          this.navigationService.filterRoutes(response.body.roles);
          this.loggedIn.next(true);
          this.user.next(response.body);
        })
      );
  }

  getUserStream(): Observable<User> {
    return this.user.asObservable();
  }

  logout(): void {
    localStorage.clear();
    this.loggedIn.next(false);
  }

  getLogStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getUser(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.loggedIn.next(true);
      this.navigationService.filterRoutes(user.roles);
      this.user.next(user);
    }
  }
}
