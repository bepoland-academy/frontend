import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../core/models';


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
  selector: 'app-delete-project-dialog',
  templateUrl: './delete-project-dialog.html',
  styles: [`
  .mat-card-header, .mat-dialog-actions {justify-content: space-around;}
  .mat-card-title {font-weight: normal; text-align: center; }
  span {font-weight: bolder; display: block;}
  `],
})

export class DeleteProjectDialog implements OnInit {

  @ViewChild('updateForm') updateProjectForm: NgForm;

  actualDepartment = '';

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectManagementService: ProjectManagementService
  ) {
    }

  ngOnInit(): void {
    this.checkDepartment();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  compareObjects(client1: Client, client2: Client): boolean {
    if (client1 && client2) {
      return client1.clientId === client2.clientId && client1.name === client2.name;
    }
  }

  checkDepartment() {
    this.actualDepartment = this.data.departments.find(
      el => el.departmentId === this.data.department
    ).name;
  }

  deleteProject() {
    this.dialogRef.close();
    // this.updateProjectForm.value.client = this.data.client;
    // this.projectManagementService.updateProject(this.data._links.self.href, this.updateProjectForm.value)
    //   .subscribe(() => {
    //     this.projectManagementService.changeReloadStatus();
    //   },
    //   (err) => {
    //   });
  }
}

