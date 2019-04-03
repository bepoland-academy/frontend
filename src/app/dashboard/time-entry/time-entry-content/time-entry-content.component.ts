import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TimeEntry, Day } from '../../../core/models';

@Component({
  selector: 'app-time-entry-content',
  templateUrl: './time-entry-content.component.html',
  styleUrls: ['./time-entry-content.component.css'],
})
export class TimeEntryContentComponent implements OnInit {
  @Input() timeEntries: TimeEntry;
  @Output() removeProject: EventEmitter<TimeEntry> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  sumAllHoursFromWeek(week: TimeEntry): number {
    return week.weekDays
      .map((day: Day) => +day.hours)
      .reduce((sum: number, nextValue: number) => sum + nextValue);
  }
  removeProjectHandler(timeEntry: TimeEntry) {
    this.removeProject.emit(timeEntry);
  }
}
