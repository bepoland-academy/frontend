import * as moment from 'moment';
import { Day } from '../../core/models';

export const sortDaysByDate = (weekDays: Array<Day>) => weekDays.sort((first: Day, second: Day) => {
  const firstEl = moment(first.date, 'DD-MM-YYYY');
  const secondEl = moment(second.date, 'DD-MM-YYYY');
  if (firstEl > secondEl) {
    return 1;
  }
  if (firstEl < secondEl) {
    return -1;
  }
  return 0;
});
