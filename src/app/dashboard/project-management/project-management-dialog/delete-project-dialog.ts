import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../core/models';
import { MatSnackBar } from '@angular/material';


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

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectManagementService: ProjectManagementService,
    private snackBar: MatSnackBar
  ) {
    }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProject(project: any) {
    this.projectManagementService.deleteProject(this.data)
      .subscribe(() => {
        this.projectManagementService.changeReloadStatus();
        this.snackBar.open(`Client ${this.data.name} was deleted`, '', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
      (err) => {
      });
    this.dialogRef.close();
  }
}



