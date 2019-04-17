import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Client, Department, Project } from '../../../core/models';

// Move interface to external file
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
  templateUrl: './create-project-dialog.html',
  styleUrls: ['./create-project-dialog.css'],
})

export class CreateProjectDialog implements OnInit {

  @ViewChild('createForm') createProjectForm: NgForm;
  step2 = false;
  step3 = false;
  editConsultant = false;
  addConsultant = false;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectManagementService: ProjectManagementService
  ) {
  }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  goToStep2() {
    this.step2 = true;
  }

  goToStep3() {
    this.step2 = false;
    this.step3 = true;
  }

  backToStep1() {
    this.step2 = false;
  }

  backToStep2() {
    this.step3 = false;
    this.step2 = true;
  }

  onEditConsultant() {
    this.editConsultant = true;
    this.addConsultant = false;
  }

  onAddConsultant() {
    this.addConsultant = true;
    this.editConsultant = false;
  }

  // editRole(role: any): void {
  //   const dialogRef = this.dialog.open(EditRoleDialog, {
  //     width: '600px',
  //     data: { ...project, departments: this.departments, clients: this.clients },
  //   });
  // }

  createProject() {
    const value = {
      ...this.createProjectForm.value,
      client: { clientId: this.createProjectForm.value.client },
    };
    this.projectManagementService.sendNewProject(value)
      .subscribe(
        () => {
          this.projectManagementService.changeReloadStatus();
          this.createProjectForm.resetForm();
        },
        () => {
        }
      );
    this.dialogRef.close();
  }
}

