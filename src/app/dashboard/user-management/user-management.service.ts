import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserManagementService {


  constructor(private http: HttpClient) {
   }

    private reloadStatus = new BehaviorSubject('false');
    notTriggerReload = this.reloadStatus.asObservable();

    testJSON = 'http://localhost:3000/users/';

    triggerReload(message: string) {
      this.reloadStatus.next(message);
    }

  postData(userRegistrationData) {
    console.log(userRegistrationData);
    return this.http.post(this.testJSON, userRegistrationData);
}

  getUsers() {
    return this.http.get(this.testJSON);
}

updateUsers(user, id): Observable<object> {
    console.log(user);
    return this.http.put(`http://localhost:3000/users/${id}`, user);
}
}
