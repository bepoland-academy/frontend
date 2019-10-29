import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Credentials } from '../models';

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient
  ) {}


  login(credentials: Credentials): Observable<any> {
    return this.http.post(environment.url + 'auth/login', credentials, { observe: 'response' as 'body' });
  }

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(environment.url + endpoint, body);
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(environment.url + endpoint);
  }

  delete(url: string) {
    return this.http.delete(url);
  }

  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  fakeGet(url: string): Observable<any> {
    return this.http.get(url);
  }

  fakePost(url: string, body: any): Observable<any> {
    return this.http.post(url, body);
  }

  fakeDelete(url: string): Observable<any> {
    return this.http.delete(url);
  }
}
