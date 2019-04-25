import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import {
  ClientsResponse,
  DepartmentsResponse,
  Project,
  ProjectsResponse,
  RolesResponse,
  UsersResponse
} from '../../core/models';

@Injectable()
export class ProjectManagementService {
  departments = 'departments';
  projects = 'projects';
  projectsByDepartment = 'projects/?department=';
  clients = 'clients';
  removable = 'timeEntry/projectExist?guid=';

  private reloadStatus = new BehaviorSubject<null>(null);

  constructor(private httpService: HttpService) { }

  changeReloadStatus(): void {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  getDepartments(): Observable<DepartmentsResponse> {
    return this.httpService.get(this.departments);
  }

  getUsersByDepartment(department: string): Observable<UsersResponse> {
    return this.httpService.get(`users?department=${department}`);
  }

  getClients(): Observable<ClientsResponse> {
    return this.httpService.get(this.clients);
  }

  getRoles(): Observable<RolesResponse> {
    return this.httpService.get('projects/roles/all');
  }

  // getProjects(department: string): Observable<Array<Project>> {
  //   return this.httpService.get(this.projectsByDepartment + department).pipe(
  //     map(response => response._embedded.projectBodyList),
  //     flatMap(res => {
  //       return forkJoin(
  //         res.map((project: Project) => {
  //           return this.isRemovable(project.projectId).pipe(
  //             map(removableRes => {
  //               return { ...project, removable: !removableRes };
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // }


  getProjects(department: string): Observable<ProjectsResponse> {
    return this.httpService.get(
      `projects?department=${department}`
    );
  }

  deleteRole(roleId: string) {
    return this.httpService.delete(`http://beontime.be-academy.pl/gateway/projects/roles/${roleId}`);
  }

  sendNewProject(newProjectData: Project) {
    console.log(newProjectData);
    return this.httpService.post(
      'projects',
      newProjectData
    );
  }

  updateProject(link: string, updatedProject: Project) {
    console.log(updatedProject);
    return this.httpService.put(
      link,
      updatedProject
    );
  }

  deleteProject(link: string) {
    return this.httpService.delete(link);
  }

  // isRemovable(projectId: string) {
  //   return this.httpService.get(`${this.removable}${projectId}`);
  // }
}
