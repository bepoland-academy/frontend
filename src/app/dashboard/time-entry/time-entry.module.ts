import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeEntryComponent } from './time-entry.component';
import { CustomMaterialModule } from '../../material/material.module';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { TimeEntryService } from './time-entry.service';
import { NumberValidationDirective } from './number-validation.directive';

@NgModule({
  declarations: [
    TimeEntryComponent,
    AddEntryComponent,
    NumberValidationDirective,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
  ],
  providers: [
    TimeEntryService,
  ],
  entryComponents: [
    AddEntryComponent,
  ],
})
export class TimeEntryModule {}
