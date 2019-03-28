import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarComponent } from './calendar.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { TimeApprovalService } from '../time-approval.service';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { FullCalendarModule } from 'ng-fullcalendar';

@NgModule({
  declarations: [
    CalendarComponent,
    TimeApprovalDialog,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FullCalendarModule,
    CustomMaterialModule,
    FormsModule,
    MatInputModule,
  ],
  exports: [
    CalendarComponent,
  ],
  providers: [
    TimeApprovalService,
  ],
  entryComponents: [
    TimeApprovalDialog,
  ],
})
export class CalendarModule { }
