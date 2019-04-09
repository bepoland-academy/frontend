import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeApprovalComponent } from './time-approval.component';
import { ConsultantsListComponent } from './consultants-list/consultants-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { TimeApprovalService } from './time-approval.service';
import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

@NgModule({
  declarations: [
    TimeApprovalComponent,
    ConsultantsListComponent,
  ],
  imports: [
    CommonModule,
    CalendarModule,
    FlexLayoutModule,
    CustomMaterialModule,
  ],
  exports: [
    TimeApprovalComponent,
  ],
  providers: [
   TimeApprovalService,
   ],
})
export class TimeApprovalModule { }
