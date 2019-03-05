import { Injectable } from '@angular/core';
import {
  HttpClient, HttpHeaders
 } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {
  // url = 'http://192.168.20.30:8080/';
  url = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  post(endpoint: string, body: any): Observable<any> {
    return this.http.post(this.url + endpoint, body);
  }

  get(endpoint: string): Observable<any> {
    return this.http.get(this.url + endpoint);
  }

  put(endpoint: string, body: any): Observable<any> {
    return this.http.put(this.url + endpoint, body);
  }

}
