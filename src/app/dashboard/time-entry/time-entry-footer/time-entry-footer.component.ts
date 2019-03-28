import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TimeEntry, Day } from '../../../core/models';

@Component({
  selector: 'app-time-entry-footer',
  templateUrl: './time-entry-footer.component.html',
  styleUrls: ['./time-entry-footer.component.css'],
})
export class TimeEntryFooterComponent implements OnInit {
  @Input() projects;
  @Output() saveCurrentEntries: EventEmitter<null> = new EventEmitter();
  @Output() submitCurrentEntries: EventEmitter<null> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  sumHoursFromSelectedDay(day: string): number {
    return this.projects
      .map((project: TimeEntry) =>
        project.weekDays.map((weekDay: Day) =>
          weekDay.day === day ? weekDay.hours : 0
        ).reduce((sum: number, val: number) => sum + val)
      ).reduce((allDaySum: number, val: number) => allDaySum + val);
  }

  saveCurrentEntriesHandler() {
    this.saveCurrentEntries.emit();
  }

  submitCurrentEntriesHandler() {
    this.submitCurrentEntries.emit();
  }
}
