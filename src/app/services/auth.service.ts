import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, from } from "rxjs";
import { tap, startWith } from "rxjs/operators";

import { NavigationService } from "../dashboard/navigation/navigation.service";
import { HttpService } from "./http.service";

export interface user {
  userId: number;
  emailLogin: string;
  firstName: string;
  lastName: string;
  department: string;
  roles: Array<string>;
  active: boolean;
}


export interface credentials {
  emailLogin: string;
  password: string;
}

@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public user = new BehaviorSubject({})

  constructor(
    public navigationService: NavigationService,
    public http: HttpService,
  ) {
    this.getUser();
  }

  public login(credentials: credentials): Observable<user> {
    return this.http.post("users/login", credentials).pipe(
      tap((user: user) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.navigationService.filterRoutes(user.roles);
        this.loggedIn.next(true);
        this.user.next(user);
      }),
    );
  }

  getUserStream() {
    return this.user
  }

  public logout(): void {
    localStorage.clear()
    this.loggedIn.next(false)
  }

  public getLogStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  public getUser(): void {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.loggedIn.next(true);
      this.navigationService.filterRoutes(user.roles);
      this.user.next(user);
    }
  }

}
