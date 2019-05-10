import { Component, OnInit } from '@angular/core';

import { HistoricalDataService } from './histrical-data.service';
import * as moment from 'moment';

@Component({
  selector: 'app-historical-data',
  templateUrl: './historical-data.component.html',
  styleUrls: ['./historical-data.component.css'],
})
export class HistoricalDataComponent implements OnInit {
  currentUser;

  constructor(
    private historicalDataService: HistoricalDataService
  ) { }

  ngOnInit() {
    let month: string | number = moment().month() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const currentDate = `${moment().year()}-${month}`;
    this.historicalDataService.getConsultantTimeSheet(currentDate).subscribe(userWithTimeSheet => {
      this.currentUser = userWithTimeSheet;
    });

  }

}
