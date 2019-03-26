import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { TimeApprovalService } from '../time-approval.service';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  exports: [
    CalendarComponent,
  ],
  providers: [
    TimeApprovalService,
  ],
})
export class CalendarModule { }
