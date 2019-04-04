import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Client, Department, Project } from '../../../core/models';
import { DeleteProjectDialog } from './delete-project-dialog';


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
  selector: 'app-project-management-dialog',
  templateUrl: './project-management-dialog.html',
  styles: [`
  .mat-card-header, .mat-dialog-actions {justify-content: space-around;}
  .mat-card {text-align: center;}
  .dialog {display: flex; justify-content: space-around;}
  .column1 {display: flex; flex-direction: column}
  `],
})

export class ProjectManagementDialog implements OnInit {

  @ViewChild('updateForm') updateProjectForm: NgForm;

  actualDepartment = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectManagementDialog>,
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

  updateProject() {
    this.dialogRef.close();
    this.updateProjectForm.value.client = this.data.client;
    this.projectManagementService.updateProject(this.data._links.self.href, this.updateProjectForm.value)
      .subscribe(() => {
        this.projectManagementService.changeReloadStatus();
      },
      (err) => {
      });
  }

  deleteProject(project: Project): void {
    const dialogRef = this.dialog.open(DeleteProjectDialog, {
      width: '600px',
      data: { ...project },
    });
    this.dialogRef.close();
  }
}

