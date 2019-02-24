import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LoginService {

  testJSON = 'http://localhost:3000/users/';


  constructor(private http: HttpClient) {
  }

  postData(loginData): Observable<Object> {
    console.log(loginData);
    return this.http.post(this.testJSON, loginData);
  }
}
