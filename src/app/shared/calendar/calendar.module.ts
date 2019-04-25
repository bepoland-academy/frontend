import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarComponent } from './calendar.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';
import { CalendarDialogComponent } from './calendar-dialog/calendar-dialog';
import { MatInputModule } from '@angular/material';
import { FullCalendarModule } from 'ng-fullcalendar';
import {
  CalendarDialogTimeApprovalComponent
} from './calendar-dialog/calendar-dialog-time-approval/calendar-dialog-time-approval.component';
import { CalendarDialogHistoricalDataComponent } from './calendar-dialog/calendar-dialog-historical-data.component';

@NgModule({
  declarations: [
    CalendarComponent,
    CalendarDialogComponent,
    CalendarDialogTimeApprovalComponent,
    CalendarDialogHistoricalDataComponent,
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
    CalendarDialogComponent,
  ],
})
export class CalendarModule { }
