import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

    testJSON = 'http://192.168.20.30:8080/users/login';
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
