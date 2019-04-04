import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { RoleManagementService } from '../../role-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Role } from '../../../../core/models';


@Component({
  selector: 'app-create-role-dialog',
  templateUrl: './create-role-dialog.html',
  styles: [`
  .mat-card-header {justify-content: center;}
  .createRole {display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class CreateRoleDialog implements OnInit {

  @ViewChild('roleForm') createRoleForm: NgForm;


  constructor(
    public dialogRef: MatDialogRef<CreateRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private roleManagementService: RoleManagementService,
    private snackBar: MatSnackBar
  ) {
    }

  ngOnInit() {
  }

  cancelCreate(): void {
    this.dialogRef.close();
  }

  createRole() {
    const value = this.createRoleForm.value;
    this.roleManagementService.createRole(value).subscribe(
      () => {
        this.roleManagementService.changeReloadStatus();
        this.createRoleForm.resetForm();
        this.snackBar.open(`New role ${value.name} created`, '', {
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

