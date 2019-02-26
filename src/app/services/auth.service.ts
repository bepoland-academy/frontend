import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { tap } from "rxjs/operators";

import { RoleAuthService } from "../dashboard/roleAuth.service";
import { HttpService } from "./http.service";

interface User {
  userId: number;
  emailLogin: string;
  firstName: string;
  lastName: string;
  department: string;
  roles: Array<string>;
  active: boolean;
}

@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private roleAuthService: RoleAuthService,
    private http: HttpService,
  ) {
    this.getUser();
  }

  public login(credentials): Observable<User> {
    return this.http.post("users/login", credentials).pipe(
      tap((user: User) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.roleAuthService.filterRoutes(user.roles);
        this.loggedIn.next(true);
      }),
    );
  }

  public logout(): void {
    localStorage.clear()
    this.loggedIn.next(false)
  }

  public getLogStatus(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  private getUser(): void {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.loggedIn.next(true);
      this.roleAuthService.filterRoutes(user.roles);
    }
  }

}
