import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';

@Injectable()
export class AuthService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(null);

  login() {
    const a = this.loggedIn.getValue();
    console.log(!a);
    this.loggedIn.next(true);
  }
  getLogStatus() {
    console.log('object');
    return this.loggedIn.asObservable();
  }
}
