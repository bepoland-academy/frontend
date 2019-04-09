import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management.component';
import { ClientManagementService } from './client-management.service';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { CreateClientDialog } from './client-management-dialog/create-client/create-client-dialog';
import { EditClientDialog } from './client-management-dialog/edit-client/edit-client-dialog';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientManagementComponent,
    CreateClientDialog,
    EditClientDialog,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
  ],
  exports: [
    ClientManagementComponent,
  ],
  providers: [
    ClientManagementService,
   ],
   entryComponents: [
    CreateClientDialog,
    EditClientDialog,
  ],
})
export class ClientManagementModule { }
