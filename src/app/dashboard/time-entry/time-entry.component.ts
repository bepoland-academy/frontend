import { Component, OnInit, ViewChild } from '@angular/core';

import * as moment from 'moment';
import { TimeEntryService } from './time-entry.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css'],
})
export class TimeEntryComponent implements OnInit {
  projects = [];
  week = [];
  currentWeek: number;
  displayedWeek: number;
  dateCalendar: Date;
  isDrawerOpened: boolean;
  constructor(private timeEntryService: TimeEntryService) {}

  ngOnInit() {
    this.timeEntryService.getTracks().subscribe(el => {
      this.projects = el.entries;
    });
    this.currentWeek = moment().week();
    this.displayedWeek = moment().week();
    this.week = this.timeEntryService.getFullWeekDaysWithDate(
      this.displayedWeek
    );
    this.dateCalendar = new Date();
  }

  openDrawer() {
    this.isDrawerOpened = true;
  }

removeProject(client, project) {
  this.timeEntryService.removeProject(client, project);
}

  sumHoursFromSelectedDay(day): number {
    return this.projects
      .map(
        client =>
          // mapping all projects from client and
          client.projects
            .map(
              // taking hours from selected day
              project => {

                // taking from day hours or returning null and after that removing all null's and return last value
                return project.weekDays
                                      .map(weekDay => weekDay.day === day ? +weekDay.hours : null)
                                      .filter(el => el !== null)[0];
              } // sum from selected day of project
            )
            .reduce((sum, val) => sum + val)
        // suming all hours from day and pass intial value
      )
      .reduce((allDaySum, val) => allDaySum + val, 0);
  }

  sumAllHoursFromWeek(week) {
    return week.weekDays.map(day => +day.hours).reduce((sum, nextValue) => sum + nextValue);
  }

  getPreviousWeek() {
    this.week = this.timeEntryService.getFullWeekDaysWithDate(
      this.displayedWeek - 1
    );
    this.displayedWeek = this.displayedWeek - 1;
    this.dateCalendar = moment(this.week[0].date, ['DD-MM-YYYY']).toDate();
  }
  getNextWeek() {
    this.week = this.timeEntryService.getFullWeekDaysWithDate(
      this.displayedWeek + 1
    );
    this.displayedWeek = this.displayedWeek + 1;
    this.dateCalendar = moment(this.week[0].date, ['DD-MM-YYYY']).toDate();
  }
  onCalendarChange(event) {
    const selectedWeek = moment(event.value).week();
    this.displayedWeek = selectedWeek;
    this.week = this.timeEntryService.getFullWeekDaysWithDate(selectedWeek);
  }
}
