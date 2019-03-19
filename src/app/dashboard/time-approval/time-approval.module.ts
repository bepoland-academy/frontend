import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeApprovalComponent } from './time-approval.component';

@NgModule({
  declarations: [TimeApprovalComponent],
  imports: [
    CommonModule,
  ],
  exports: [
    TimeApprovalComponent,
  ],
})
export class TimeApprovalModule { }
