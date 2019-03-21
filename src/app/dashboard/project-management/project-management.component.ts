import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ProjectManagementService } from './project-management.service';
import { Department } from '../../core/models';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProjectManagementDialog } from './project-management-dialog/project-management-dialog';
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

  departments: Array<Department> = [];
  projectsList1: Array<any> = [];
  // Duplicate projectsList for the filter purpose
  projectsList2: Array<any> = [];
  isLoading = false;
  isSuccess = false;
  isFail = false;
  errorMessage = '';
  errorOnCreate = '';
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
    this.getDepartments();
    this.projectManagementService.getReloadStatus().subscribe(() => {
      if (this.currentDepartment) {
        this.displayProjects(this.currentDepartment);
      }
    });
    this.projectManagementService.getClientsList().subscribe((data: any) => {
      this.clientsList = data._embedded.clientBodyList;
    });
  }

  getDepartments() {
    this.projectManagementService.getDepartments().subscribe(
      (data: any) => {
        this.departments = data._embedded.departmentBodyList;
      },
      () => {
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

  displayProjects(event) {
    this.currentDepartment = event;
    this.projectManagementService.getProjects(event.departmentId).subscribe(
      data => {

        const projects = groupProjectsByClient(data._embedded.projectBodyList);
        this.projectsList1 = projects;
        this.projectsList2 = projects;
      },
      () => {
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
          this.errorOnCreate = 'Ups! Something went wrong :(';
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
    this.projectsList2 = this.projectsList1.filter(
      client => client.clientName.toLowerCase().includes(event.target.value));
  }

}
