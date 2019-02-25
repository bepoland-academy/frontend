import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersReportComponent } from './users-report.component';
import { CustomMaterialModule } from '../../../material/material.module';
import { UserManagementService } from '../user-management.service';


@NgModule({
  declarations: [UsersReportComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  exports: [
    UsersReportComponent
  ],
  providers: [
    UserManagementService
  ]
})
export class UsersReportModule { }
