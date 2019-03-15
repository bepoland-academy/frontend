import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpService {
  url = 'http://54.37.131.33';

  token: string;

  constructor(private http: HttpClient) {
    this.getToken();
  }

  getToken() {
    const token = JSON.parse(localStorage.getItem('token'));
    if (token) {
      this.token = token;
    }
  }

  login(endpoint: string, body: any, option): Observable<any> {
    return this.http.post(this.url + endpoint, body, option).pipe(
      tap(response => {
        this.token = response.headers.get('Authorization');
        localStorage.setItem('token', JSON.stringify(this.token));
      })
    );
  }

  changePassword(endpoint: string, body: any) {
    return this.http.post(this.url + endpoint, body);
  }

  post(endpoint: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token,
      }),
    };
    return this.http.post(this.url + endpoint, body, httpOptions);
  }

  get(endpoint: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token,
      }),
    };
    return this.http.get(this.url + endpoint, httpOptions);
  }

  put(url: string, body: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token,
      }),
    };
    return this.http.put(url, body, httpOptions);
  }

  fakeGet(url): Observable<any> {
    return this.http.get(url);
  }
}
