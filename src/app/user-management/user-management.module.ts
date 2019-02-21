import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserManagementComponent } from './user-management.component';
import { UserRegistrationModule } from './user-registration/user-registration.module';

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule, UserRegistrationModule, FlexLayoutModule
  ],
  exports: [UserManagementComponent]
})
export class UserManagementModule { }
