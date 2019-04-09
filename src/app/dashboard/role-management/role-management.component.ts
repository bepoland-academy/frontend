import { Component, OnInit } from '@angular/core';
import { RoleManagementService } from './role-management.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateRoleDialog } from './role-management-dialog/create-role/create-role-dialog';
import { EditRoleDialog } from './role-management-dialog/edit-role/edit-role-dialog';
import { Role, RolesResponse } from '../../core/models';


@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})

export class RoleManagementComponent implements OnInit {
  roles: Array<Role> = [];

  constructor(
    private roleManagementService: RoleManagementService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.roleManagementService.getReloadStatus().subscribe(() => {
      this.roleManagementService.getRoles().subscribe((data: RolesResponse) => {
        this.roles = data._embedded.roleBodyList;
      });
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateRoleDialog, {
    });
  }

  openEditDialog(role: Role): void {
    const dialogRef = this.dialog.open(EditRoleDialog, {
      data: role,
    });
  }

}
