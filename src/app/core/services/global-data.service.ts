import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from './http.service';
import { Project, Client, ProjectWithoutClient, ProjectsResponse, ClientsResponse } from '../models';

@Injectable()
export class GlobalDataService {
  private projectsStream: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);

  private clientsStream: BehaviorSubject<Array<Client>> = new BehaviorSubject([]);

  constructor(private http: HttpService) {}

  public getGlobalData(): Observable<[ProjectWithoutClient[], Client[]]> {
    const projectsFetch: Observable<Array<ProjectWithoutClient>> = this.http
      .get(`projects/all`)
      .pipe(
        map((res: ProjectsResponse) => res._embedded.projectBodyList)
      );
    const clientsFetch: Observable<Array<Client>> = this.http.get(`clients/`)
      .pipe(
        map((res: ClientsResponse) => res._embedded.clientBodyList)
      );

    return forkJoin(
      projectsFetch,
      clientsFetch
    );
  }

  public set setProjects(projects: Array<ProjectWithoutClient>) {
    const clients = this.clientsStream.getValue();
    const projectsWithClient: Array<Project> = projects.map((project: ProjectWithoutClient) => (
      {
        ...project,
        client: clients.find(o => o.clientId === project.clientGuid),
      }
    ));
    this.projectsStream.next(projectsWithClient);
  }

  public get getProjectsValue() {
    return this.projectsStream.getValue();
  }

  public get getProjectsStream() {
    return this.projectsStream;
  }

  public set setClients(clients: Array<Client>) {
    this.clientsStream.next(clients);
  }

  public get getClientsStream() {
    return this.clientsStream.asObservable();
  }

  public get getClientsValue() {
    return this.clientsStream.getValue();
  }
}
