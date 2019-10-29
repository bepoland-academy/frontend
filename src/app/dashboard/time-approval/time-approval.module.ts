import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeApprovalComponent } from './time-approval.component';
import { ConsultantsListComponent } from './consultants-list/consultants-list.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { TimeApprovalService } from './time-approval.service';
import { CalendarModule } from 'src/app/shared/components/calendar/calendar.module';
import { sharedModules } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TimeApprovalComponent,
    ConsultantsListComponent,
  ],
  imports: [
    CommonModule,
    ...sharedModules,
  ],
  exports: [
    TimeApprovalComponent,
  ],
  providers: [
   TimeApprovalService,
   ],
})
export class TimeApprovalModule { }
