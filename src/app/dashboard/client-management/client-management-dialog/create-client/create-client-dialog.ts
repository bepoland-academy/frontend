import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ClientManagementService } from '../../client-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../../core/models';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientManagementService: ClientManagementService,
    private snackBar: MatSnackBar
  ) {
    }

  ngOnInit() {
  }

  cancelCreate(): void {
    this.dialogRef.close();
  }

  createClient() {
    console.log(this.createClientForm.value.clientName);
    // this.isLoading = true;
    const value: any = this.createClientForm.value;

    this.clientManagementService.createClient(value).subscribe(
      () => {
        // this.isLoading = false;
        // this.isSuccess = true;
        this.clientManagementService.changeReloadStatus();
        // setTimeout(() => {
        //   this.isSuccess = false;
        //   this.changeDetectorRefs.detectChanges();
        // }, 3000);
        this.createClientForm.resetForm();
        this.snackBar.open(`New client ${value.clientName} created`, '', {
          duration: 2000,
          verticalPosition: 'top',
        });
      },
      error => {
        console.log(error);
        // this.isLoading = false;
        // this.isFail = true;
        // if (error.status === 409) {
        //   if (error.error.message === 'USER ALREADY EXISTS') {
        //     this.errorMessage = 'Please check your username(email) or password';
        //   }
        // } else if ((/^[5]/g).test(error.status)) {
        //   this.errorMessage = `Oh no! Something bad happened.
        //   Please come back later when we fixed that problem. Thanks`;
        // } else {
        //   this.errorMessage = 'Please check your Internet connection';
        // }
        // setTimeout(() => {
        //   this.isFail = false;
        //   this.changeDetectorRefs.detectChanges();
        // }, 3000);
      }
    );
    this.dialogRef.close();
  }


}

