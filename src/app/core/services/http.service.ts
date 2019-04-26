import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Project, ProjectsResponse, Client, ClientsResponse, ProjectWithoutClient } from '../models';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpService {
  url = 'http://beontime.be-academy.pl/gateway/';

  projectsStream: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);

  clientsStream: BehaviorSubject<Array<Client>> = new BehaviorSubject([]);

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
    const projectsFetch: Observable<Array<ProjectWithoutClient>> = this.http
      .get(`${this.url}projects/all`)
      .pipe(
        map((res: ProjectsResponse) => res._embedded.projectBodyList)
      );
    const clientsFetch: Observable<Array<Client>> = this.http.get(`${this.url}clients/`)
        .pipe(
          map((res: ClientsResponse) => res._embedded.clientBodyList)
        );

    forkJoin(
      projectsFetch,
      clientsFetch
    )
    .pipe(
      map((responses: [ProjectWithoutClient[], Client[]]) => {
        const projects = responses[0];
        const clients = responses[1];
        this.clientsStream.next(clients);
        return projects.map((project: ProjectWithoutClient) => (
          {
            ...project,
            client: clients.find(o => o.clientId === project.clientGuid)}
        ));
      })
    )
    .subscribe(
      (projects: Array<Project>) => {
        this.projectsStream.next(projects);
      },
      () => this.snackBar.open('Something went wrong, app would not work correctly', 'X', {duration: 5000})
    );

  }

  getProjectsStream() {
    return this.projectsStream;
  }

  getClientsStream() {
    return this.clientsStream;
  }
}
