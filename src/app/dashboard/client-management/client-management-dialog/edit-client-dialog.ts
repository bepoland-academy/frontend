import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ClientManagementService } from '../client-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../core/models';
import { MatSnackBar } from '@angular/material';

// export interface DialogData {
//   client: string;
//   name: string;
//   rate: string;
//   comments: string;
//   active: string;
//   departments: Array<any>;
//   department: string;
//   _links: any;
// }


@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.html',
  styles: [`
  .mat-card-header {justify-content: center;}
  .editClient {display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class EditClientDialog implements OnInit {
  client: any;

  @ViewChild('updateForm') updateClientForm: NgForm;

  constructor(
    public dialogRef: MatDialogRef<EditClientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientManagementService: ClientManagementService,
    private snackBar: MatSnackBar
  ) {
    }

  ngOnInit() {
    this.client = this.data.clientName;
  }

  editClient() {
    this.data.clientName = this.updateClientForm.value.clientName;
    this.clientManagementService.updateClient(this.data)
      .subscribe(() => {
        this.clientManagementService.changeReloadStatus();
      },
      (err) => {
      });
    this.dialogRef.close();
  }

deleteClient() {
  this.clientManagementService.deleteClient(this.data)
    .subscribe(() => {
      this.clientManagementService.changeReloadStatus();
      this.snackBar.open(`Client ${this.data.clientName} was deleted`, '', {
        duration: 2000,
        verticalPosition: 'top',
      });
    },
    (err) => {
    });
  this.dialogRef.close();
}
}

