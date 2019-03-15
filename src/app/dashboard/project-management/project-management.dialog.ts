import { Component, ViewChild, Inject } from '@angular/core';
import { ProjectManagementService } from './project-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface DialogData {
  client: string;
  name: string;
  rate: string;
  comments: string;
  active: string;
}

@Component({
  selector: 'project-management-dialog',
  templateUrl: './project-management.dialog.html',
  styles: [`
  .mat-card-header, .mat-dialog-actions {justify-content: space-around;}
  .mat-card {text-align: center;}
  `],
})

export class ProjectManagementDialog {

  @ViewChild('updateForm') updateProjectForm: NgForm;


  constructor(
    public dialogRef: MatDialogRef<ProjectManagementDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectManagementService: ProjectManagementService
    ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateProject() {
    this.dialogRef.close();
    this.projectManagementService.updateProject(this.updateProjectForm.value);
    console.log(this.updateProjectForm.value);
  }
}
