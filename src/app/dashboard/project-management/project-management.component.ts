import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectManagementService } from './project-management.service';
import {
  Department,
  DepartmentsResponse,
  Client,
  ClientsResponse,
  Project,
  ProjectsByClient
} from '../../core/models';
import { NgForm, FormControl } from '@angular/forms';
import { MatDialog, TooltipPosition } from '@angular/material';
import { ProjectManagementDialog } from './edit-project-dialog/edit-project-dialog';
import { groupProjectsByClient } from 'src/app/shared/utils/groupProjectsByClient';
import { CreateProjectDialog } from './create-project-dialog/create-project-dialog';


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
    },
    self: {
      href: string;
    }
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
  actualDepartment: string;
  actualClient: string;
  currentDepartment: Department;
  roles: any;

  constructor(
    private projectManagementService: ProjectManagementService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getDepartments();
    this.projectManagementService.getReloadStatus().subscribe(() => {
      if (this.currentDepartment) {
        this.displayProjects(this.currentDepartment);
      }
    });
    this.projectManagementService.getClientsList().subscribe((data: ClientsResponse) => {
      this.clients = data._embedded.clientBodyList;
    });
    this.projectManagementService.getRoles().subscribe((data) => {
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
      });
  }


  setDepartment(event: Department) {
    this.actualDepartment = event.name;
  }

  displayProjects(event: Department) {
    this.currentDepartment = event;
    this.projectManagementService.getProjects(event.departmentId).subscribe(
      (data: Array<Project>) => {
        const projects = groupProjectsByClient(data);
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
  }

  // createProject() {
  //   const value = {
  //     ...this.newProjectForm.value,
  //     client: { clientId: this.newProjectForm.value.client },
  //   };
  //   this.projectManagementService.sendNewProject(value)
  //     .subscribe(
  //       () => {
  //         this.isSuccess = true;
  //         this.projectManagementService.changeReloadStatus();
  //         setTimeout(() => {
  //           this.isSuccess = false;
  //           this.changeDetectorRefs.detectChanges();
  //         }, 3000);
  //         this.newProjectForm.resetForm();
  //       },
  //       () => {
  //         this.isFail = true;
  //         this.errorOnCreate = 'Ups! Something went wrong :(';
  //         setTimeout(() => {
  //           this.isFail = false;
  //           this.changeDetectorRefs.detectChanges();
  //         }, 3000);
  //       }
  //     );
  // }

  editProject(project: Project): void {
    const dialogRef = this.dialog.open(ProjectManagementDialog, {
      width: '600px',
      data: { ...project, departments: this.departments, clients: this.clients },
    });
  }

  createProject(project: Project): void {
    const dialogRef = this.dialog.open(CreateProjectDialog, {
      data: { departments: this.departments, clients: this.clients, roles: this.roles },
    });
  }

  filterClients(event: Event) {
    this.projectsList2 = this.projectsList1.filter(
      client => client.clientName.toLowerCase().includes((<HTMLInputElement> event.target).value));
  }
}
