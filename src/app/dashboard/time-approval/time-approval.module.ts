import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeApprovalComponent } from './time-approval.component';
import { ConsultantsListModule } from './consultants-list/consultants-list.module';
import { CalendarModule } from './calendar/calendar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [TimeApprovalComponent],
  imports: [
    CommonModule,
    ConsultantsListModule,
    CalendarModule,
    FlexLayoutModule,
    CustomMaterialModule,
  ],
  exports: [
    TimeApprovalComponent,
  ],
})
export class TimeApprovalModule { }
