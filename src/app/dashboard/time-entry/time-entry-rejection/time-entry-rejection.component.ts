import { Component, OnInit, Input } from '@angular/core';
import { TimeEntry, Day } from 'src/app/core/models';

@Component({
  selector: 'app-time-entry-rejection',
  templateUrl: './time-entry-rejection.component.html',
  styleUrls: ['./time-entry-rejection.component.css'],
})
export class TimeEntryRejectionComponent implements OnInit {
  @Input() timeEntries: Array<TimeEntry>;
  rejectedDays: Array<Day>;
  constructor() { }

  ngOnInit() {
    this.rejectedDays = this.timeEntries[0].weekDays.filter(el => el.status === 'REJECTED');
  }

}
