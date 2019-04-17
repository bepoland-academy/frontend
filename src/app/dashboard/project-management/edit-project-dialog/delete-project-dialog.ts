import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Client, Department } from '../../../core/models';

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
    // delete onInit + implements if not used
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteProject() {
    this.projectManagementService.deleteProject(this.data)
      .subscribe(() => {
        this.projectManagementService.changeReloadStatus();
        this.snackBar.open(`Project ${this.data.name} was deleted`, '', {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open(`Project ${this.data.name} cannot be deleted`, '', {
          duration: 2000,
        });
      });
    this.dialogRef.close();
  }
}



