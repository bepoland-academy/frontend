import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRegistrationComponent } from './user-registration.component';
import { CustomMaterialModule } from '../../material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserManagementService } from '../user-management.service';


@NgModule({
  declarations: [UserRegistrationComponent],
  imports: [
    CommonModule, CustomMaterialModule, FormsModule, FlexLayoutModule
  ],
  exports: [UserRegistrationComponent],
  providers: [UserManagementService]
})
export class UserRegistrationModule { }
