import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { DepartmentResponse } from '../../shared/interfaces';

@Injectable()
export class ProjectManagementService {

  departments = 'departments';
  projects1 = 'projects';
  projects2 = 'projects/?department=';

  constructor(private httpService: HttpService) { }

  getDepartments(): Observable< DepartmentResponse > {
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

