import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import { TimeEntryService } from './time-entry.service';
import { Project, ProjectsByClient } from '../../core/models';

export interface Day {
  day: string;
  date: string;
  hours: number;
  status: string;
  comment: string;
}

export interface TimeEntry {
  projectId: string;
  week: string;
  weekDays: Array<Day>;
}

export interface TimeEntry {
  projectId: string;
  week: string;
  weekDays: Array<Day>;
  projectInfo: Project;
}


@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css'],
})
export class TimeEntryComponent implements OnInit {
  projects: Array<TimeEntry> = [];
  week: Array<Day> = [];
  clientList: Array<ProjectsByClient> = [];
  currentWeek: number;
  displayedWeek: number;
  dateCalendar: Date;
  currentYear: number;
  isDrawerOpened: boolean;
  isLoading: boolean;
  isError: boolean;

  constructor(
    private timeEntryService: TimeEntryService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    if (!activeRoute.snapshot.queryParamMap['params'].week) {
      this.currentYear = moment().year();
      let currentWeek = moment().week().toString();
      if (currentWeek.length === 1) {
        currentWeek = `0${currentWeek}`;
      }
      router.navigate([], { queryParams: { week: `${this.currentYear}-W${currentWeek}` } });
    }
  }

  ngOnInit() {
    this.isLoading = true;
    const currentWeek: string = this.activeRoute.snapshot.queryParamMap['params'].week;
    this.currentWeek = +currentWeek.substr(6, 2);
    this.displayedWeek = +currentWeek.substr(6, 2);
    this.timeEntryService.fetchTracks(currentWeek).subscribe(
      (projects: [Array<TimeEntry>, Array<ProjectsByClient>]) => {
        this.projects = projects[0];
        this.clientList = projects[1];
        console.log(projects);
        this.isLoading = false;
        this.isError = false;
    },
    () => {
      this.isError = true;
      this.isLoading = false;
    });

    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.currentYear, this.displayedWeek);
    this.dateCalendar = new Date();
  }

  openDrawer(): void {
    this.isDrawerOpened = true;
  }

  createNewProject(project: Project): void {
    const newProject: TimeEntry = this.timeEntryService.createAttributesForNewProject(
      project,
      {
        year: this.currentYear,
        week: this.displayedWeek,
      });

    this.projects = [...this.projects, newProject];
  }

  removeProject(project: TimeEntry): void {
    if (project.weekDays[0].status === 'submitted') {
      return;
    }
    this.projects = this.projects.filter(proj => proj.projectId !== project.projectId);
  }

  sumHoursFromSelectedDay(day: string): number {
    return this.projects
      .map((project: TimeEntry) =>
        project.weekDays.map((weekDay: Day) =>
          weekDay.day === day ? weekDay.hours : 0
        ).reduce((sum: number, val: number) => sum + val)
      ).reduce((allDaySum: number, val: number) => allDaySum + val);
  }

  sumAllHoursFromWeek(week: TimeEntry): number {
    return week.weekDays
      .map((day: Day) => +day.hours)
      .reduce((sum: number, nextValue: number) => sum + nextValue);
  }

  getPreviousWeek(): void {
    this.displayedWeek = this.displayedWeek - 1;
    if (this.displayedWeek < 1) {
      this.currentYear -= 1;
      this.displayedWeek = 52;
    }
    this.changeRouteAndSetWeekWithDates();
  }
  getNextWeek(): void {
    this.displayedWeek = this.displayedWeek + 1;
    if (this.displayedWeek > 52) {
      this.currentYear += 1;
      this.displayedWeek = 1;
    }
    this.changeRouteAndSetWeekWithDates();
  }
  onCalendarChange(event): void {
    const value: moment.Moment = moment(event.value);
    const selectedWeek: number = value.week();
    const selectedYear: number = value.year();
    const isDecember: boolean = value.month() === 11;
    this.displayedWeek = selectedWeek;
    this.currentYear = selectedYear;
    // checking if date is between years and taking higher week
    if (isDecember && selectedWeek === 1) {
      this.currentYear = selectedYear + 1;
    }
    this.changeRouteAndSetWeekWithDates();
  }

  changeRouteAndSetWeekWithDates(): void {
    this.router.navigate([], { queryParams: { week: `${this.currentYear}-W${this.displayedWeek}` } });
    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.currentYear, this.displayedWeek);
    this.dateCalendar = moment(this.week[0].date, ['DD-MM-YYYY']).toDate();
  }

  saveCurrentEntries() {
    this.projects = this.projects
      .filter((project: TimeEntry) => !project.weekDays.every((day: Day) => !day.hours))
      .map((project: TimeEntry) => (
        {
          ...project,
          weekDays: project.weekDays.map((day: Day) => ({ ...day, status: !day.status ? 'saved' : day.status })),
        })
      );
  }

  sumbitCurrentEntries() {
    this.projects = this.projects
      .filter((project: TimeEntry) => !project.weekDays.every((day: Day) => !day.hours))
      .map((project: TimeEntry) => (
        {
          ...project,
          weekDays: project.weekDays.map((day: Day) => (
            {
              ...day,
              status: day.status !== 'submitted' ? 'submitted' : day.status,
            })
          ),
        })
      );
  }
}
