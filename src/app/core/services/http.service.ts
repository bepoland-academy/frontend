import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
        (response: ProjectsResponse) => {

          const rates =  [
            {
              role_id: 1,
              rate: 100,
              onSiteRate: 150,
              consultants: [
                '7041cb03-200d-457c-84a9-a4881527448f',
              ],
            },
            {
              role_id: 2,
              role: {},
              rate: 200,
              onSiteRate: 150,
              allUsers: [],
              consultants: [
                '7bb710ee-c16c-4c58-8343-73854a461160',
                'af197078-ef3e-46e6-893f-e016e05c895f',
              ],
            },
          ];
          // const a = response._embedded.projectBodyList.map(el => )
          this.projectsStream.next(response._embedded.projectBodyList);
        },
        () => this.snackBar.open('Something went wrong, the app would not work correctly')._dismissAfter(5000)
      );
  }

  getProjectsStream() {
    return this.projectsStream;
  }
}
