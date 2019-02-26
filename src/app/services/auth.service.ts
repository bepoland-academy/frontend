import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { RoleAuthService } from '../dashboard/roleAuth.service';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private roleAuthService: RoleAuthService,
    private http: HttpService
  ) {
    this.getUser();
    this.loggedIn.next(true);
    this.roleAuthService.filterRoutes(['CONSULTANT', 'ADMINISTRATOR']);
  }
  login(credentials) {
    console.log(credentials)
    //this.loggedIn.next(true);
    localStorage.setItem('credentials', credentials);
    
    this.loggedIn.next(true);
    return this.http.post('users/login/', credentials).subscribe(user => {
      this.roleAuthService.filterRoutes(user.roles);
    })
  }
  getLogStatus() {
    return this.loggedIn.asObservable();
  }
  getUser() {
    const credentials = localStorage.getItem('credentials');
    // if (credentials) {
    //   this.loggedIn.next(true);
    //   this.login(credentials);
    // }
  }
}
