import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Department } from '../../models';

@Injectable()
export class ProjectManagementService {

  departments = 'departments';
  projects1 = 'projects';
  projects2 = 'projects/?department=';

  private reloadStatus = new BehaviorSubject<null>(null);


  constructor(private httpService: HttpService) { }

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  getDepartments(): Observable< Array<Department> > {
    return this.httpService.get(this.departments);
  }
  // Don't forget to add Observable< Array<Project>

  getProjects(department: string): Observable <any> {
    return this.httpService.get(this.projects2 + department);
  }

  sendNewProject(newProjectData: any) {
    return this.httpService.post(this.projects1, newProjectData);
  }

  updateProject(url, updatedProject: any) {
    return this.httpService.put(url, updatedProject);
  }
}

