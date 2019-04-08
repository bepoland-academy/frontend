import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleManagementComponent } from './role-management.component';
import { RoleManagementService } from './role-management.service';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { CreateRoleDialog } from './role-management-dialog/create-role/create-role-dialog';
import { EditRoleDialog } from './role-management-dialog/edit-role/edit-role-dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    RoleManagementComponent,
    CreateRoleDialog,
    EditRoleDialog,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
  ],
  exports: [
    RoleManagementComponent,
  ],
  providers: [
    RoleManagementService,
  ],
   entryComponents: [
    CreateRoleDialog,
    EditRoleDialog,
  ],
})
export class RoleManagementModule { }
