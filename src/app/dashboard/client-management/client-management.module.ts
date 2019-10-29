import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { CreateClientDialogComponent } from './client-management-dialog/create-client/create-client-dialog';
import { EditClientDialogComponent } from './client-management-dialog/edit-client/edit-client-dialog';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    ClientManagementComponent,
    CreateClientDialogComponent,
    EditClientDialogComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    ClientManagementComponent,
  ],
   entryComponents: [
    CreateClientDialogComponent,
    EditClientDialogComponent,
  ],
})
export class ClientManagementModule { }
