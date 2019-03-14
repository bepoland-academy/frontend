import { Injectable } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Observable } from 'rxjs';
import { Department } from '../../models';

@Injectable()
export class ProjectManagementService {

  departments = 'departments/';
  projects1 = 'projects/';
  projects2 = 'projects/?department=';

  constructor(private httpService: HttpService) { }

  getDepartments(): Observable< Array<Department> > {
    return this.httpService.get(this.departments);
  }
  // Don't forget to add Observable< Array<Project>

  getProjects(department: string): Observable <any> {
    console.log(this.projects2 + department);
    return this.httpService.get(this.projects2 + department);
  }

  sendNewProject(newProjectData: any) {
    return this.httpService.post(this.projects1, newProjectData);
  }

  updateProject(updatedProject: any) {
    return this.httpService.put(this.projects1, updatedProject);
  }
}

