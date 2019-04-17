import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Project, ProjectsResponse } from '../models';

@Injectable()
export class HttpService {
  // I'd move it to config file and import it above
  url = 'http://beontime.be-academy.pl/gateway/';

  projectsStream: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}


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

  fetchProjects(department) {
    this.http.get(`${this.url}projects?department=${department}`)
      .subscribe(
        (projects: ProjectsResponse) => this.projectsStream.next(projects._embedded.projectBodyList),
        () => this.snackBar.open('Something went wrong, the app would not work correctly')._dismissAfter(5000)
      );
  }

  getProjectsStream() {
    return this.projectsStream;
  }
}
