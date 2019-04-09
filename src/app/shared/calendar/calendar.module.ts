import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';
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
  entryComponents: [
    TimeApprovalDialog,
  ],
})
export class CalendarModule { }
