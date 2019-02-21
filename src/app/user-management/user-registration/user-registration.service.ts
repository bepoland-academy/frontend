import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserRegistrationService {

    testJSON = 'http://localhost:3000/users/';


  constructor(private http: HttpClient) {
   }

  postData(userRegistrationData): Observable<Object> {
    console.log(userRegistrationData);
    return this.http.post(this.testJSON, userRegistrationData);
}
}