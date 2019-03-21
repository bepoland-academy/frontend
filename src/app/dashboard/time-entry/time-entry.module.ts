import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeEntryComponent } from './time-entry.component';
import { CustomMaterialModule } from '../../shared/material/material.module';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { TimeEntryService } from './time-entry.service';
import { ValidationDirective } from './validation.directive';
import { QuantityComponent } from './quantity/quantity.component';
import { WeekendDirective } from './weekend.directive';

@NgModule({
  declarations: [
    TimeEntryComponent,
    AddEntryComponent,
    ValidationDirective,
    QuantityComponent,
    AddEntryComponent,
    WeekendDirective,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
  ],
  providers: [TimeEntryService],
})
export class TimeEntryModule {}
