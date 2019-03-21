import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectManagementService } from './project-management.service';
import { Department } from '../../core/models';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProjectManagementDialog } from './project-management.dialog';
import { groupProjectsByClient } from 'src/app/shared/utils/groupProjectsByClient';

export interface DialogData {
  client: string;
  name: string;
  rate: string;
  comments: string;
  active: string;
}

@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css'],
})

export class ProjectManagementComponent implements OnInit {

  @ViewChild('myForm') newProjectForm: NgForm;

  departments: Array<Department>;
  isDataAvailable = false;
  isDepartment = false;
  isProject = false;
  serverError = false;
  clientList: any;
  clients: any;
  isLoading = false;
  isSuccess = false;
  isFail = false;
  errorMessage: string;
  actualDepartment: string;
  actualClient: string;
  currentDepartment: any;
  clientsList: Array<object>;

  constructor(
    private projectManagementService: ProjectManagementService,
    private changeDetectorRefs: ChangeDetectorRef,
    public dialog: MatDialog
  ) { }

  ngOnInit() {

    this.projectManagementService.getDepartments()
    .subscribe(
      (data: any) => {
        this.departments = data._embedded.departmentBodyList;
        this.isDataAvailable = true;
        this.isDepartment = true;
      },
      () => {
        this.serverError = true;
        this.isDepartment = true;
        this.isLoading = false;
        this.isFail = true;
        this.errorMessage = 'Ups! Something went wrong :(';
        setTimeout(() => {
          this.isFail = false;
          this.changeDetectorRefs.detectChanges();
        }, 3000);
      });
  }


  setDepartment(event) {
    this.actualDepartment = event.name;
  }

  getDepartments() {
    this.projectManagementService.getDepartments()
      .subscribe(
        (data: any) => {
          this.departments = data._embedded.departmentBodyList;
          this.isDataAvailable = true;
          this.isDepartment = true;
        },
        () => {
          this.serverError = true;
          this.isDepartment = true;
        });
  }

  displayProjects(event) {
    this.currentDepartment = event;
    this.projectManagementService.getProjects(event.departmentId).subscribe(
      data => {
        const projects = groupProjectsByClient(data._embedded.projectBodyList);
        this.clientList = projects;
        this.clients = projects;
        this.isProject = true;
      },
      () => {
        this.serverError = true;
        this.isLoading = false;
        this.isFail = true;
        this.errorMessage = 'Ups! Something went wrong :(';
        setTimeout(() => {
          this.isFail = false;
          this.changeDetectorRefs.detectChanges();
        }, 3000);
      }
    );

  }

  createProject() {
    const value = {
      ...this.newProjectForm.value,
      client: {clientId: this.newProjectForm.value.client},
    };
    this.projectManagementService.sendNewProject(value)
      .subscribe(
        () => {
          this.isLoading = false;
          this.isSuccess = true;
          this.projectManagementService.changeReloadStatus();
          setTimeout(() => {
            this.isSuccess = false;
            this.changeDetectorRefs.detectChanges();
          }, 3000);
          this.newProjectForm.resetForm();
        },
        error => {
          this.isLoading = false;
          this.isFail = true;
          this.errorMessage = 'Ups! Something went wrong :(';
          setTimeout(() => {
            this.isFail = false;
            this.changeDetectorRefs.detectChanges();
          }, 3000);
        }
      );
  }

  openDialog(project): void {
    const dialogRef = this.dialog.open(ProjectManagementDialog, {
      width: '600px',
      data: { ...project, departments: this.departments, clients: this.clientsList },
    });
  }

  filterClients(event) {
    this.clients = this.clientList.filter(client => client.clientName.toLowerCase().includes(event.target.value));
  }

}
