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

  ngOnInit(): void {
  }

  cancelCreate(): void {
    this.dialogRef.close();
  }

  createRole(): void {
    const value = this.createRoleForm.value;
    this.roleManagementService.createRole(value).subscribe(
      () => {
        this.roleManagementService.changeReloadStatus();
        this.createRoleForm.resetForm();
        this.snackBar.open(`New role ${value.name} created`, '', {
          duration: 2000,
        });
      },
      error => {
        this.snackBar.open(`Ups! New role ${value.name} has not been created`, '', {
          duration: 2000,
        });
      }
    );
    this.dialogRef.close();
  }

}

