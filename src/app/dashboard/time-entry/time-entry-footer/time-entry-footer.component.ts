import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, ViewChildren } from '@angular/core';

import { TimeEntry, Day } from '../../../core/models';
import { MatTooltip, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-time-entry-footer',
  templateUrl: './time-entry-footer.component.html',
  styleUrls: ['./time-entry-footer.component.css'],
})
export class TimeEntryFooterComponent implements OnInit {
  @Input() timeEntries: Array<TimeEntry>;
  @Output() enteredHoursIsMoreThan24: EventEmitter<boolean> = new EventEmitter();
  @Output() saveCurrentEntries: EventEmitter<null> = new EventEmitter();
  @Output() submitCurrentEntries: EventEmitter<null> = new EventEmitter();
  daysWithMoreThan24Hours: Array<string> = [];
  constructor(private snackBar: MatSnackBar) { }

  ngOnInit() {

  }
  sumHoursFromSelectedDay(day: string): number {
    this.daysWithMoreThan24Hours = this.daysWithMoreThan24Hours.filter(el => el !== day);
    this.enteredHoursIsMoreThan24.emit(false);
    const sum: number = this.timeEntries
      .map((project: TimeEntry) =>
        project.weekDays.map((weekDay: Day) =>
          weekDay.day === day ? weekDay.hours : 0
        ).reduce((sum: number, val: number) => sum + val)
      ).reduce((allDaySum: number, val: number) => allDaySum + val);
    if (sum >= 24) {
      if (!this.daysWithMoreThan24Hours.includes(day)) {
        this.daysWithMoreThan24Hours = [...this.daysWithMoreThan24Hours, day];
      }
      this.enteredHoursIsMoreThan24.emit(true);
    }
    return sum;
  }

  saveCurrentEntriesHandler() {
    this.saveCurrentEntries.emit();
  }

  submitCurrentEntriesHandler() {
    this.submitCurrentEntries.emit();
  }
}
