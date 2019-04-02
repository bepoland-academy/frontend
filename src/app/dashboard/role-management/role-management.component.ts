import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from './role-management.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleDialog } from './role-management-dialog/create-role/create-role-dialog';
import { EditRoleDialog } from './role-management-dialog/edit-role/edit-role-dialog';


@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})

export class RoleManagementComponent implements OnInit {
  roles: Array<any> = [];

  constructor(
    private roleManagementService: RoleManagementService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.roleManagementService.getReloadStatus().subscribe(() => {
      this.roleManagementService.getRoles().subscribe((data) => {
        this.roles = data;
      });
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleDialog, {
    });
  }

  openEditDialog(role: any): void {
    const dialogRef = this.dialog.open(EditRoleDialog, {
      data: role,
    });
  }

}
