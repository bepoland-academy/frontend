import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(true);

  login() {
    this.loggedIn.next(true);
  }
  getLogStatus() {
    return this.loggedIn.asObservable();
  }
}
