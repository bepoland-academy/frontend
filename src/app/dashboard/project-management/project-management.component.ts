import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectManagementService } from './project-management.service';
import {
  Department,
  DepartmentsResponse,
  Client,
  ClientsResponse,
  Project,
  ProjectsByClient,
  ProjectsResponse,
  RolesResponse,
  UsersResponse,
  ProjectWithoutClient,
} from '../../core/models';
import { NgForm, FormControl } from '@angular/forms';
import { MatDialog, TooltipPosition } from '@angular/material';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
import { groupProjectsByClient } from 'src/app/shared/utils/groupProjectsByClient';

export interface DialogData {
  active: boolean;
  client: Client;
  clients: Array<Client>;
  comments: string;
  department: string;
  departments: Array<Department>;
  name: string;
  projectId: string;
  rate: number;
  removable: boolean;
  _links: {
    DELETE: {
      href: string;
    };
    self: {
      href: string;
    };
  };
}

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})
export class ProjectManagementComponent implements OnInit {
  @ViewChild('myForm') newProjectForm: NgForm;

  departments: Array<Department> = [];
  clients: Array<Client> = [];
  projectsList1: Array<ProjectsByClient> = [];
  // Duplicate projectsList for the filter purpose
  projectsList2: Array<ProjectsByClient> = [];

  isSuccess = false;
  isFail = false;
  errorMessage = '';
  errorOnCreate = '';
  actualDepartmentName: string;
  actualDepartmentId: string;
  actualClient: string;
  currentDepartment: Department;
  roles: any;
  usersByDepartment: any;

  constructor(
    private projectManagementService: ProjectManagementService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getDepartments();
    this.projectManagementService.getReloadStatus().subscribe(() => {
      if (this.currentDepartment) {
        this.displayProjects(this.currentDepartment);
      }
    });
    this.projectManagementService
      .getClients()
      .subscribe((data: ClientsResponse) => {
        this.clients = data._embedded.clientBodyList;
      });
    this.projectManagementService
      .getRoles()
      .subscribe((data: RolesResponse) => {
        this.roles = data._embedded.roleBodyList;
      });
  }

  getDepartments() {
    this.projectManagementService.getDepartments().subscribe(
      (data: DepartmentsResponse) => {
        this.departments = data._embedded.departmentBodyList;
      },
      () => {
        this.isFail = true;
        this.errorMessage = 'Ups! Something went wrong :(';
        setTimeout(() => {
          this.isFail = false;
          this.changeDetectorRefs.detectChanges();
        }, 3000);
      }
    );
  }

  setDepartment(event: Department) {
    this.actualDepartmentName = event.name;
    this.actualDepartmentId = event.departmentId;
  }

  displayProjects(event: Department) {
    this.currentDepartment = event;
    this.projectManagementService.getProjects(event.departmentId).subscribe(
      (data: ProjectsResponse) => {
        const projectsResponse = data._embedded.projectBodyList;

        const projectWithClient: Array<Project> = projectsResponse
          .map((project: ProjectWithoutClient)  => {
            const client = this.clients.find(client => client.clientId === project.clientGuid);
            return {...project, client};
            }
          );

        const projects = groupProjectsByClient(projectWithClient);
        this.projectsList1 = projects;
        this.projectsList2 = projects;
      },
      () => {
        this.isFail = true;
        this.errorMessage = 'Ups! Something went wrong :(';
        setTimeout(() => {
          this.isFail = false;
          this.changeDetectorRefs.detectChanges();
        }, 3000);
      }
    );
    this.projectManagementService
      .getUsersByDepartment(event.departmentId)
      .subscribe((data: UsersResponse) => {
        this.usersByDepartment = data._embedded.userBodyList;
      });
  }

  createProject(): void {
    this.roles = this.roles.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.usersByDepartment = this.usersByDepartment.map(user => {
      return (user = { ...user, name: user.firstName + ' ' + user.lastName });
    });
    this.usersByDepartment = this.usersByDepartment.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: {
        department: this.actualDepartmentId,
        clients: this.clients,
        roles: this.roles,
        usersByDepartment: this.usersByDepartment,
      },
    });
  }

  editProject(project: Project): void {
    console.log(project);
    this.roles = this.roles.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
    this.usersByDepartment = this.usersByDepartment.map(user => {
      return (user = { ...user, name: user.firstName + ' ' + user.lastName });
    });
    this.usersByDepartment = this.usersByDepartment.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    const dialogRef = this.dialog.open(ProjectDialogComponent, {
      data: {
        project,
        department: this.actualDepartmentId,
        clients: this.clients,
        roles: this.roles,
        usersByDepartment: this.usersByDepartment,
        currentDepartment: this.currentDepartment,
      },
    });
  }

  filterClients(event: Event) {
    this.projectsList2 = this.projectsList1.filter(client =>
      client.clientName
        .toLowerCase()
        .includes((<HTMLInputElement> event.target).value)
    );
  }
}
