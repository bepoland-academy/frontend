import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Project, ProjectsResponse } from '../models';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpService {
  url = 'http://beontime.be-academy.pl/gateway/';

  projectsStream: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}


  login(endpoint: string, body: any, option): Observable<any> {
    console.log(body);
    return this.http.post(this.url + endpoint, body, option).pipe(
      tap(response => {
        console.log(response);
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

  // get(endpoint: string): Observable<any> {
  //   return this.http.get(endpoint);
  // }

  put(url: string, body: any): Observable<any> {
    return this.http.put(url, body);
  }

  delete(endpoint: string): Observable<any> {
    return this.http.delete(this.url + endpoint);
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
    return this.projectsStream.asObservable();
  }
}
