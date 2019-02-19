import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestRequest {

    testJSON = 'http://localhost:3000/users/';
    newUser = {
      name: "GET",
      surname: "Syl",
      role: "administrator",
      isActive: true,
      department: "banking"
    }

  constructor(private http: HttpClient) {
   }

  postData(): Observable<Object> {
    return this.http.post(this.testJSON, this.newUser);
}
 
}