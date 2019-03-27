import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpService {
  url = 'http://beontime.be-academy.pl/gateway/';

  constructor(private http: HttpClient) {}


  login(endpoint: string, body: any, option): Observable<any> {
    return this.http.post(this.url + endpoint, body, option).pipe(
      tap(response => {
        const token = response.headers.get('Authorization');
        localStorage.setItem('token', JSON.stringify(token));
      })
    );
  }

  changePassword(endpoint: string, body: any) {
    return this.http.post(this.url + endpoint, body);
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(this.url + endpoint, body);
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(this.url + endpoint);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  fakeGet(url: string): Observable<any> {
    return this.http.get(url);
  }
}
