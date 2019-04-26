import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from 'src/app/shared/material/material.module';

import { ReportsComponent } from './reports.component';
import { ReportsHeaderComponent } from './reports-header/reports-header.component';
import { ReportsService } from './reports.service';
import { ReportsContentComponent } from './reports-content/reports-content.component';
import { ReportsContentHeaderComponent } from './reports-content/reports-content-header/reports-content-header.component';

@NgModule({
  declarations: [
    ReportsComponent,
    ReportsHeaderComponent,
    ReportsContentComponent,
    ReportsContentHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CustomMaterialModule,
  ],
  providers: [
    ReportsService,
  ],
})
export class ReportsModule { }
