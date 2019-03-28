import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  ClientsResponse,
  DepartmentsResponse,
  Project,
  ProjectsResponse,
} from '../../core/models';

@Injectable()
export class ProjectManagementService {

  departments = 'departments';
  projects = 'projects';
  projectsByDepartment = 'projects/?department=';
  clients = 'clients';

  private reloadStatus = new BehaviorSubject<null>(null);


  constructor(private httpService: HttpService) {}

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  getDepartments(): Observable<DepartmentsResponse> {
    return this.httpService.get(this.departments);
  }

  getClientsList(): Observable<ClientsResponse> {
    return this.httpService.get(this.clients);
  }

  getProjects(department: string): Observable <ProjectsResponse> {
    return this.httpService.get(this.projectsByDepartment + department);
  }

  sendNewProject(newProjectData: Project) {
    return this.httpService.post(this.projects, newProjectData);
  }

  updateProject(url: string, updatedProject: Project) {
    return this.httpService.put(url, updatedProject);
  }
}

