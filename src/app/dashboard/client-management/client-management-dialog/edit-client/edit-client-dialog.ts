import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ClientManagementService } from '../../client-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../../core/models';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.html',
  styles: [`
  .mat-card {padding-right: 0;}
  .mat-card-header {justify-content: center;}
  .input {display: flex; justify-content: space-around; align-items: center;}
  .editClient {width: 250px; display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class EditClientDialog implements OnInit {
  client: string;

  @ViewChild('updateForm') updateClientForm: NgForm;

  constructor(
    public dialogRef: MatDialogRef<EditClientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private clientManagementService: ClientManagementService,
    private snackBar: MatSnackBar
  ) {
    }

  ngOnInit() {
    this.client = this.data.name;
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }

  editClient(): void {
    this.data.name = this.updateClientForm.value.name;
    this.clientManagementService.updateClient(this.data)
      .subscribe(() => {
        this.clientManagementService.changeReloadStatus();
      },
      (err) => {
        this.snackBar.open(`Ups! Changes for client ${this.data.name} have not been saved`, '', {
          duration: 2000,
        });
      });
    this.dialogRef.close();
  }

deleteClient(): void {
  this.clientManagementService.deleteClient(this.data)
    .subscribe(() => {
      this.clientManagementService.changeReloadStatus();
      this.snackBar.open(`Client ${this.data.name} was deleted`, '', {
        duration: 2000,
      });
    },
    (err) => {
      this.snackBar.open(`Client ${this.data.name} cannot be deleted`, '', {
        duration: 2000,
      });
    });
  this.dialogRef.close();
}
}

