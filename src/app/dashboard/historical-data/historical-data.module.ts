import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoricalDataComponent } from './historical-data.component';
import { HistoricalDataService } from './histrical-data.service';
import { CalendarModule } from 'src/app/shared/calendar/calendar.module';

@NgModule({
  declarations: [HistoricalDataComponent],
  imports: [
    CommonModule,
    CalendarModule,
  ],
  providers: [
    HistoricalDataService,
  ],
})
export class HistoricalDataModule { }
