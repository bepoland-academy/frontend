import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './material/material.module';
import { CalendarModule } from './calendar/calendar.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
    CalendarModule,
  ],
})
export class SharedModule { }
