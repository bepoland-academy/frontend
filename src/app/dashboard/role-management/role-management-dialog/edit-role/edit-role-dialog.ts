import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { RoleManagementService } from '../../role-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { Role } from '../../../../core/models';


@Component({
  selector: 'app-edit-role-dialog',
  templateUrl: './edit-role-dialog.html',
  styles: [`
  .mat-card {padding-right: 0;}
  .mat-card-header {justify-content: center;}
  .input {display: flex; justify-content: space-around; align-items: center;}
  .editRole {width: 250px; display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class EditRoleDialog implements OnInit {
  role: string;

  @ViewChild('updateForm') updateRoleForm: NgForm;

  constructor(
    public dialogRef: MatDialogRef<EditRoleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Role,
    private roleManagementService: RoleManagementService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.role = this.data.name;
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }

  editRole(): void {
    this.data.name = this.updateRoleForm.value.name;
    this.roleManagementService.updateRole(this.data)
      .subscribe(() => {
        this.roleManagementService.changeReloadStatus();
      },
        (err) => {
          this.snackBar.open(`Ups! Changes for the role ${this.data.name} have not been saved`, '', {
            duration: 2000,
          });
        });
    this.dialogRef.close();
  }

  deleteRole(): void {
    this.roleManagementService.deleteRole(this.data)
      .subscribe(() => {
        this.roleManagementService.changeReloadStatus();
        this.snackBar.open(`Role ${this.data.name} was deleted`, '', {
          duration: 2000,
        });
      },
        (err) => {
          this.snackBar.open(`Role ${this.data.name} cannot be deleted`, '', {
            duration: 2000,
          });
        });
    this.dialogRef.close();
  }
}

