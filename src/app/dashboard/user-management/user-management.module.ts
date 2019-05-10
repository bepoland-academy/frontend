import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserManagementComponent } from './user-management.component';
import { UserManagementService } from './user-management.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { UsersReportComponent } from './users-report/users-report.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { UserRegistrationComponent } from './user-registration/user-registration.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
   UserManagementComponent,
   UsersReportComponent,
   UserRegistrationComponent,
  ],
  imports: [
   CommonModule,
   FormsModule,
   CustomMaterialModule,
   FlexLayoutModule,
   SharedModule,
  ],
  exports: [
   UserManagementComponent,
  ],
  providers: [
   UserManagementService,
  ],
 })
 export class UserManagementModule {}
