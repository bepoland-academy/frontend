import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ClientManagementService } from '../../client-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../../core/models';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.html',
  styles: [`
  .mat-card-header {justify-content: center;}
  .createClient {display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class CreateClientDialog implements OnInit {

  @ViewChild('clientForm') createClientForm: NgForm;


  constructor(
    public dialogRef: MatDialogRef<CreateClientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private clientManagementService: ClientManagementService,
    private snackBar: MatSnackBar
  ) {
    }

  ngOnInit() {
  }

  cancelCreate(): void {
    this.dialogRef.close();
  }

  createClient(): void {
    const value = this.createClientForm.value;

    this.clientManagementService.createClient(value).subscribe(
      () => {
        this.clientManagementService.changeReloadStatus();
        this.createClientForm.resetForm();
        this.snackBar.open(`New client ${value.name} created`, '', {
          duration: 2000,
        });
      },
      error => {
        this.snackBar.open(`Ups! New client ${value.name} has not been created`, '', {
          duration: 2000,
        });
      }
    );
    this.dialogRef.close();
  }


}

