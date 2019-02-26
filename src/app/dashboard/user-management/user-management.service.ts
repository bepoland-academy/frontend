import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class UserManagementService {

  public testJSON = "http://192.168.20.30:8080/users/";

  private reloadStatus = new BehaviorSubject("false");
  
  public notTriggerReload = this.reloadStatus.asObservable();

  constructor(private http: HttpClient) {}

  public triggerReload(message: string) {
    this.reloadStatus.next(message);
  }

  public postData(userRegistrationData) {
    console.log(userRegistrationData);
    return this.http.post(this.testJSON, userRegistrationData);
}

  public getUsers() {
    return this.http.get(this.testJSON);
}

  public updateUsers(user, id): Observable<object> {
    console.log(user);
    return this.http.put(`http://192.168.20.30:8080/users/${id}`, user);
}
}
