import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { HttpService } from '../../services/http.service';

@Injectable()
export class TimeEntryService {
  constructor(private httpService: HttpService) {}
  endpoint = 'tracks';

  getTracks() {
    return this.httpService.get(this.endpoint);
  }

  getCurrentFullWeek(week) {
    const startOfWeek = moment()
      .week(week)
      .startOf('isoWeek');
      
    const endOfWeek = moment()
      .week(week)
      .endOf('isoWeek');

    const days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.format('DD-MM-YYYY'));
      day = day.clone().add(1, 'd');
    }
    return days;
  }

}
