import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';

@NgModule({
  declarations: [CalendarComponent],
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
  exports: [
    CalendarComponent,
  ],
})
export class CalendarModule { }
