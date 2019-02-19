import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TestRequest {

    testJSON = 'assets/test.json';

  constructor(private http: HttpClient) {
   }

   getJSON(): Observable<Object> {
    return this.http.get(this.testJSON);
}
 
// sendAuthData(): Observable<Response> {
//   return this.http.post(this.testJSON, authData, options)
// }
}