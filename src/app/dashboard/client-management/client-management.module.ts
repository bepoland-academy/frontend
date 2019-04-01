import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientManagementComponent } from './client-management.component';

@NgModule({
  declarations: [ClientManagementComponent],
  imports: [
    CommonModule,
  ],
  exports: [ClientManagementComponent],
})
export class ClientManagementModule { }
