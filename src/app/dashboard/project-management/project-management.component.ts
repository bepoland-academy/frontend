import { Component, ViewChild, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { ProjectManagementService } from './project-management.service';
import { Department } from '../../models';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ProjectManagementDialog } from './project-management.dialog';

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
projects: any;
isLoading = false;
isSuccess = false;
isFail = false;
errorMessage: string;

constructor(
  private projectManagementService: ProjectManagementService,
  private changeDetectorRefs: ChangeDetectorRef,
  public dialog: MatDialog
) { }

ngOnInit() {
  this.projectManagementService.getDepartments()
  .subscribe(
    (data: Array<Department>) => {
    this.departments = data;
    this.isDataAvailable = true;
    this.isDepartment = true;
  },
    () => {
    this.serverError = true;
    this.isDepartment = true;
  });
}

displayProjects(e: string) {
  this.projectManagementService.getProjects(e)
  .subscribe(
    (data) => {
      console.log(data);
      const groupBy = ((xs, key) => {
      return xs.reduce((rv, x) => {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
      }, {});
    });
      this.projects = Object.entries(groupBy(data, 'client'));
      this.isProject = true;
  },
    () => {
    this.serverError = true;
  });
  setTimeout(() => {
    console.log(this.projects);
  }, 3000);
}

createProject() {
  const value = this.newProjectForm.value;
  console.log(value);
  this.projectManagementService.sendNewProject(value)
      .subscribe(
        () => {
          this.isLoading = false;
          this.isSuccess = true;
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

openDialog(client, project): void {
  console.log(client, project.rate);
  const dialogRef = this.dialog.open(ProjectManagementDialog, {
    width: '600px',
    data: {
      client,
      name: project.name,
      rate: project.rate,
      department: project.department,
      comments: project.comments,
      active: project.active,
    },
  });
}

filterClients(event) {
  console.log(event.path[0].value);
}

}
