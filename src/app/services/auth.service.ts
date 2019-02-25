import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

import { RoleAuthService } from '../dashboard/roleAuth.service';

@Injectable()
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private dbAuth: AngularFireAuth,
    private roleAuthService: RoleAuthService
  ) {
    this.getUser();
  }
  login(user, password) {
    this.dbAuth.auth.setPersistence('none').then(() => {
      this.dbAuth.auth.signInWithEmailAndPassword(user, password)
        .then(el => {
          this.loggedIn.next(true);
          localStorage.setItem('user', user);
          localStorage.setItem('password', password);
          this.roleAuthService.filterRoutes(['consultant', 'administrator']);
        })
        .catch(err => console.log(`error ${err}`));
    });
  }
  getLogStatus() {
    return this.loggedIn.asObservable();
  }
  getUser() {
    const password = localStorage.getItem('password');
    const user = localStorage.getItem('user');
    if (user && password) {
      this.loggedIn.next(true);
      this.login(user, password);
    }
  }
}
