import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { tap } from "rxjs/operators";

import { RoleAuthService } from "../dashboard/roleAuth.service";
import { HttpService } from "./http.service";

@Injectable()
export class AuthService {

  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private roleAuthService: RoleAuthService,
    private http: HttpService,
  ) {
    this.getUser();
  }
  public login(credentials) {
    return this.http.post("users/login", credentials).pipe(
      tap((user) => {
        localStorage.setItem("user", JSON.stringify(user));
        this.roleAuthService.filterRoutes(user.roles);
        this.loggedIn.next(true);
      }),
    );
  }
  public getLogStatus() {
    return this.loggedIn.asObservable();
  }
  public getUser() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      this.loggedIn.next(true);
      this.roleAuthService.filterRoutes(user.roles);
    }
  }
}
