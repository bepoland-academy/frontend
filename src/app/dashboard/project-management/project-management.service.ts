import { Injectable } from '@angular/core';
import { HttpService } from '../../core/services/http.service';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { ClientsResponse, DepartmentsResponse, Project } from '../../core/models';
import { map, flatMap } from 'rxjs/operators';

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

  getClientsList(): Observable<ClientsResponse> {
    return this.httpService.get(this.clients);
  }

  getProjects(department: string) {
    return this.httpService.get(this.projectsByDepartment + department).pipe(
      map((response) => response._embedded.projectBodyList),
      flatMap((res) => {
        return forkJoin(
          res.map((project: Project) => {
            return this.isRemovable(project.projectId).pipe(
              map(removableRes => {
                return { ...project, removable: !removableRes };
              })
            );
          })
        );
      })
    );
  }

  sendNewProject(newProjectData: Project) {
    return this.httpService.post(this.projects, newProjectData);
  }

  updateProject(url: string, updatedProject: Project) {
    return this.httpService.put(url, updatedProject);
  }

  deleteProject(project: Project) {
    return this.httpService.delete(project._links.DELETE.href);
  }

  isRemovable(projectId: string) {
    return this.httpService.get(`${this.removable}${projectId}`);
  }

  getRoles(): Observable<any> {
    return this.httpService.get('projects/roles/all');
  }
}

