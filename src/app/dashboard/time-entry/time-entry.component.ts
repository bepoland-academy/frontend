import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as moment from 'moment';
import { TimeEntryService } from './time-entry.service';
import { Project, ProjectsByClient, Day, TimeEntry } from '../../core/models';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css'],
})
export class TimeEntryComponent implements OnInit {
  projects: any = [];
  week: Array<Day> = [];
  clientList: any = [];
  currentWeek: number;
  displayedWeek: number;
  dateCalendar: Date;
  currentYear: number;
  isDrawerOpened: boolean;
  isLoading: boolean;
  isError: boolean;
  _links: any;

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
      (projects) => {
        console.log(projects);
        this.projects = projects[0];
        this.clientList = projects[1];
        this._links = projects[2];
        this.isLoading = false;
        this.isError = false;
    },
    (a) => {
      console.log(a);
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
    if (project.weekDays[0].status === 'SUBMITTED') {
      return;
    }
    this.projects = this.projects.filter(proj => proj.projectId !== project.projectId);
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
  getWeekFromCalendar(val): void {
    const value = moment(val);
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
    this.projects = [];
    this.isLoading = true;
    const param = `${this.currentYear}-W${this.displayedWeek}`;
    this.router.navigate([], { queryParams: { week: param } });
    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.currentYear, this.displayedWeek);
    this.dateCalendar = moment(this.week[0].date, ['DD-MM-YYYY']).toDate();
    this.timeEntryService.fetchTracks(param).subscribe(
      (projects) => {
        console.log(projects);
        this.projects = projects[0];
        this.clientList = projects[1];
        this._links = {...projects[2]};
        this.isLoading = false;
        this.isError = false;
      },
      (a) => {
        console.log(a);
        this.isError = true;
        this.isLoading = false;
      });
  }

  saveCurrentEntries() {
    this.projects = this.projects
      .filter((project: TimeEntry) => !project.weekDays.every((day: Day) => !day.hours))
      .map((project: TimeEntry) => (
        {
          ...project,
          weekDays: project.weekDays.map((day: Day) => ({ ...day, status: !day.status ? 'SAVED' : day.status })),
        })
      );
    if (!this.projects.length) {
        return ;
      }
    const dataToSend = this.projects.map(({projectInfo, ...rest}) => rest);
    if (this._links.self) {
      this.timeEntryService.updateEntries(this._links.self, dataToSend).subscribe((res) => {console.log('poszlos'); });
    } else {
      this.timeEntryService.sendNewEntries(`${this.currentYear}-W${this.displayedWeek}`, dataToSend).subscribe((res) => { console.log('poszlos'); });
    }
  }

  submitCurrentEntries() {
    this.projects = this.projects
      .filter((project: TimeEntry) => !project.weekDays.every((day: Day) => !day.hours))
      .map((project: TimeEntry) => (
        {
          ...project,
          weekDays: project.weekDays.map((day: Day) => (
            {
              ...day,
              status: day.status !== 'SUBMITTED' ? 'SUBMITTED' : day.status,
            })
          ),
        })
      );

    if (!this.projects.length) {
      return;
    }
    const dataToSend = this.projects.map(({ projectInfo, ...rest }) => rest);
    if (this._links.self) {
      this.timeEntryService.updateEntries(this._links.self, dataToSend).subscribe((res) => { console.log('poszlos'); });
    } else {
      this.timeEntryService.sendNewEntries(`${this.currentYear}-W${this.displayedWeek}`, dataToSend).subscribe((res) => { console.log('poszlos'); });
    }
  }
}
