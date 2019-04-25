import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimeEntryComponent } from './time-entry.component';
import { CustomMaterialModule } from '../../shared/material/material.module';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { TimeEntryService } from './time-entry.service';
import { ValidationDirective } from './directives/validation.directive';
import { QuantityComponent } from './time-entry-content/quantity/quantity.component';
import { DayDirective } from './directives/day.directive';
import { GroupProjectsByClientPipe } from './groupProjectsByClient.pipe';
import { TimeEntryNaviagtionComponent } from './time-entry-naviagtion/time-entry-naviagtion.component';
import { TimeEntryHeadingComponent } from './time-entry-heading/time-entry-heading.component';
import { TimeEntryContentComponent } from './time-entry-content/time-entry-content.component';
import { TimeEntryFooterComponent } from './time-entry-footer/time-entry-footer.component';
import { FooterDirective } from './directives/footer.directive';
import { DialogDeleteComponent } from './time-entry-content/dialog/time-entry-content-dialog';
import { TimeEntryRejectionComponent } from './time-entry-rejection/time-entry-rejection.component';

@NgModule({
  declarations: [
    TimeEntryComponent,
    AddEntryComponent,
    ValidationDirective,
    QuantityComponent,
    AddEntryComponent,
    DayDirective,
    FooterDirective,
    GroupProjectsByClientPipe,
    TimeEntryNaviagtionComponent,
    TimeEntryHeadingComponent,
    TimeEntryContentComponent,
    TimeEntryFooterComponent,
    DialogDeleteComponent,
    TimeEntryRejectionComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
  ],
  providers: [TimeEntryService],
  entryComponents: [
    DialogDeleteComponent,
  ],
})
export class TimeEntryModule {}
