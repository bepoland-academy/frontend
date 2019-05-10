import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomMaterialModule } from './material/material.module';
import { CalendarModule } from './components/calendar/calendar.module';
import { ErrorComponent } from './components/error/error.component';

export const sharedModules = [
  CalendarModule,
  CustomMaterialModule,
  FlexLayoutModule,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ErrorComponent,
  ],
  exports: [
    ErrorComponent,
  ],
})
export class SharedModule { }
