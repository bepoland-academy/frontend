import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class UserManagementService {

 public testJSON = "http://192.168.20.30:8080/users/";
//  public testJSON = "http://localhost:3000/users/";

 private reloadStatus = new BehaviorSubject <any> (false);

 constructor(private http: HttpClient) {}

 public changeReloadStatus() {
  this.reloadStatus.next(true);
 }

 public getReloadStatus() {
  return this.reloadStatus.asObservable();
 }

 public postData(userRegistrationData) {
  return this.http.post(this.testJSON, userRegistrationData);
 }

 public getUsers() {
  return this.http.get(this.testJSON);
 }

   public updateUsers(user, id): Observable<object> {
     console.log(user);
     return this.http.put(`http://192.168.20.30:8080/users/${id}`, user);
 }

//  public updateUsers(user, id): Observable < object > {
//   console.log(user);
//   return this.http.put(`http://localhost:3000/users/${id}`, user);
//  }
}