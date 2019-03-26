import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultantsListComponent } from './consultants-list.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { TimeApprovalService } from '../time-approval.service';

@NgModule({
  declarations: [ConsultantsListComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  exports: [
    ConsultantsListComponent,
  ],
  providers: [
    TimeApprovalService,
  ],
})
export class ConsultantsListModule { }
