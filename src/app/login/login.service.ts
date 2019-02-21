import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    testJSON = 'http://locahost:3000/users/';
    newUser = {
      name: 'GET',
      surname: 'Syl',
      role: 'administrator',
      isActive: true,
      department: 'banking'
    };

  constructor(private http: HttpClient) {
   }

  postData(loginData): Observable<any> {
    console.log(loginData);
    return this.http.post(this.testJSON, this.newUser);
}
}
