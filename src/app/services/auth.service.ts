import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { NavigationService } from '../dashboard/navigation/navigation.service';
import { HttpService } from './http.service';
import { User, Credentials } from '../models/index';

@Injectable()
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  user: ReplaySubject<User> = new ReplaySubject(1);

  constructor(
    private navigationService: NavigationService,
    private http: HttpService
  ) {
    const a = {
      userId: 4,
      emailLogin: 't4.email@be-tse.com',
      firstName: 'Name_4',
      lastName: 'Lastname_4',
      isActive: false,
      userDepartment: 'DIGITAL',
      roles: [
        'CONSULTANT',
        'ADMINISTRATION',
        'MANAGER',
      ],
      active: false,
    };
    localStorage.setItem('user', JSON.stringify(a));
    this.getUser();
  }

  login(credentials: Credentials): Observable<User> {
    return this.http.post('users/login', credentials).pipe(
      tap((user: User) => {
        localStorage.setItem('user', JSON.stringify(user));
        this.navigationService.filterRoutes(user.roles);
        this.loggedIn.next(true);
        this.user.next(user);
      })
    );
  }

  getUserStream(): ReplaySubject<User> {
    return this.user;
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
