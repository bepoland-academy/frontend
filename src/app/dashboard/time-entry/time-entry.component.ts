import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as moment from 'moment';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { TimeEntryService } from './time-entry.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css'],
})
export class TimeEntryComponent implements OnInit {
  entries = [];
  week = [];
  currentWeek: number;
  displayedWeek: number;
  dateCalendar: Date;
  constructor(
    public dialog: MatDialog,
    private timeEntryService: TimeEntryService
  ) {}

  ngOnInit() {
    this.timeEntryService.getTracks().subscribe(el => {
      this.entries = el.entries;
    });
    this.currentWeek = moment().week();
    this.displayedWeek = moment().week();
    this.week = this.timeEntryService.getCurrentFullWeek(this.displayedWeek);
    this.dateCalendar = new Date();
  }

  addNew(entry) {
    const dialogRef = this.dialog.open(AddEntryComponent, {
      data: { entry },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }
  sumHoursFromSelectedDay(day): number {
    return this.entries
      .map(
        client =>
          // mapping all projects from client and
          client.projects
            .map(
              // taking hours from selected day
              project => {
                // checking searched day exists in week. for eg monday if not exists it would return 0
                if (!project[day]) {
                  return 0;
                }
                return project[day].hours;
              }
              // sum from selected day of project
            )
            .reduce((sum, val) => sum + val)
        // suming all hours from day and pass intial value
        )
        .reduce((allDaySum, val) => allDaySum + val, 0);
  }

  sumAllDaysFromWeek(week) {
    let sum = 0;
    for (const day in week) {
      if (week[day].hours) {
        sum += week[day].hours;
      }
    }
    return sum;
  }

  getPreviousWeek() {
    this.week = this.timeEntryService.getCurrentFullWeek(this.displayedWeek - 1);
    this.displayedWeek = this.displayedWeek - 1;
    this.dateCalendar = moment(this.week[0], ['DD-MM-YYYY']).toDate();
  }
  getNextWeek() {
    this.week = this.timeEntryService.getCurrentFullWeek(this.displayedWeek + 1);
    this.displayedWeek = this.displayedWeek + 1;
    this.dateCalendar = moment(this.week[0], ['DD-MM-YYYY']).toDate();
  }
  onCalendarChange(event) {
    const selectedWeek = moment(event.value).week();
    this.displayedWeek = selectedWeek;
    this.week = this.timeEntryService.getCurrentFullWeek(selectedWeek);
  }
}
