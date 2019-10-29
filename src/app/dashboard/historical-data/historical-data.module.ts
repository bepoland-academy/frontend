import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoricalDataComponent } from './historical-data.component';
import { HistoricalDataService } from './histrical-data.service';
import { sharedModules } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HistoricalDataComponent],
  imports: [
    CommonModule,
    ...sharedModules,
  ],
  providers: [
    HistoricalDataService,
  ],
})
export class HistoricalDataModule { }
