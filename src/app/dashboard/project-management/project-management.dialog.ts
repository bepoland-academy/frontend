import { Component, ViewChild, Inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { ProjectManagementService } from './project-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  client: string;
  name: string;
  rate: string;
  comments: string;
  active: string;
  departments: Array<any>;
  department: string;
  _links: any;
}

@Component({
  selector: 'project-management-dialog',
  templateUrl: './project-management.dialog.html',
  styles: [`
  .mat-card-header, .mat-dialog-actions {justify-content: space-around;}
  .mat-card {text-align: center;}
  `],
})

export class ProjectManagementDialog implements OnInit {

  @ViewChild('updateForm') updateProjectForm: NgForm;

  actualDepartment = '';
  constructor(
    public dialogRef: MatDialogRef<ProjectManagementDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectManagementService: ProjectManagementService,
    private ref: ChangeDetectorRef
  ) {

    }
  ngOnInit(): void {
    this.checkDepartment();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  checkDepartment() {
    this.actualDepartment = this.data.departments.find(
      el => el.departmentId === this.data.department
    ).name;
  }

  updateProject() {
    this.dialogRef.close();
    console.log(this.updateProjectForm.value.client, this.data.client);
    this.updateProjectForm.value.client = this.data.client;
    this.projectManagementService.updateProject(this.data._links.self.href, this.updateProjectForm.value)
      .subscribe(el => console.log(el));
    console.log(this.updateProjectForm.value);
  }
}
