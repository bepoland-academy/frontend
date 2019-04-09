import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

import * as moment from 'moment';
import { TimeEntryService } from './time-entry.service';
import { HttpService } from '../../core/services/http.service';
import {
  Project,
  ProjectsByClient,
  Day,
  TimeEntry,
  TimeEntriesWithLinksAndProjects,
  Links,
  User
} from '../../core/models';
import { groupProjectsByClient } from 'src/app/shared/utils/groupProjectsByClient';


@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css'],
})
export class TimeEntryComponent implements OnInit {
  timeEntries: Array<TimeEntry> = [];
  week: Array<Day> = [];
  clientList: Array<Project> = [];
  showingClientList: Array<ProjectsByClient> = [];
  currentWeek: number;
  displayedWeek: number | string;
  displayedYear: number;
  currentYear: number;
  dateCalendar: Date;
  isDrawerOpened: boolean;
  isLoading: boolean;
  isError: boolean;
  _links: Links;

  constructor(
    private timeEntryService: TimeEntryService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {
    // if there is no param defined we are defining it at constructor so we can on method ngOnInit get defined param
    // because we could be redirected to time entry page from Historical Data component
    if (activeRoute.snapshot.queryParamMap['params'].week) {
      return;
    }
    const year = moment().year();
    let currentWeek = moment().week().toString();
    if (currentWeek.length === 1) {
      currentWeek = `0${currentWeek}`;
    }
    router.navigate([], { queryParams: { week: `${year}-W${currentWeek}` } });

  }

  ngOnInit() {
    const weekParam: string = this.activeRoute.snapshot.queryParamMap['params'].week;
    this.displayedYear = +weekParam.substr(0, 4);
    this.currentYear = moment().year();
    this.currentWeek = moment().week();
    this.displayedWeek = +weekParam.substr(6, 2);

    // making subscribe to projects, because sometimes data from timeEntry endpoint is fetched faster than from projects
    // endpoint
    this.timeEntryService.getProjects().subscribe(
      () => {
        this.fetchDataChangeRouteAndGetWeekDates();
      },
      () => {
        this.isError = true;
      }
    );

  }

  getPreviousWeek(): void {
    this.displayedWeek = +this.displayedWeek - 1;
    if (this.displayedWeek < 1) {
      this.displayedYear -= 1;
      this.displayedWeek = 52;
    }
    this.fetchDataChangeRouteAndGetWeekDates();
  }

  getNextWeek(): void {
    this.displayedWeek = +this.displayedWeek + 1;
    if (this.displayedWeek > 52) {
      this.displayedYear += 1;
      this.displayedWeek = 1;
    }
    this.fetchDataChangeRouteAndGetWeekDates();
  }

  getWeekFromCalendar(val): void {
    const value = moment(val);
    const selectedWeek: number = value.week();
    const selectedYear: number = value.year();
    const isDecember: boolean = value.month() === 11;
    this.displayedWeek = selectedWeek;
    this.displayedYear = selectedYear;
    // checking if date is between years and taking higher week
    if (isDecember && selectedWeek === 1) {
      this.displayedYear = selectedYear + 1;
    }
    this.fetchDataChangeRouteAndGetWeekDates();
  }

  setToCurrentDate(): void {
    this.displayedWeek = this.currentWeek;
    this.displayedYear = this.currentYear;
    this.fetchDataChangeRouteAndGetWeekDates();
  }

  removeProject(timeEntry: TimeEntry): void {
    if (timeEntry._links.DELETE) {
      this.httpService.delete(timeEntry._links.DELETE.href).subscribe(() => {
        this.fetchDataChangeRouteAndGetWeekDates();
      });
      return;
    }
    this.timeEntries = this.timeEntries.filter((el: TimeEntry) => el.projectId !== timeEntry.projectId);
    this.getDifferenceBetweenTimeEntriesAndProjects();
  }

  fetchDataChangeRouteAndGetWeekDates() {
    this.timeEntries = [];
    // setting loading to true
    this.isLoading = true;
    // add 0 prefix for number lower than 10 (without it backend will throw error that week not exisits)
    if (this.displayedWeek < 10) {
      this.displayedWeek = `0${this.displayedWeek}`;
    }
    // setting param to call backend
    const param = `${this.displayedYear}-W${this.displayedWeek}`;

    // formatting displayedWeek to number (we need it for moment library)
    this.displayedWeek = +this.displayedWeek;

    // getting full week with dates from service
    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.displayedYear, this.displayedWeek);

    // fetching data
    this.timeEntryService.fetchTracks(param).subscribe(
      (response: TimeEntriesWithLinksAndProjects) => {
        this.timeEntries = response.timeEntries;
        this._links = response._links;
        this.clientList = response.projectList;
        this.getDifferenceBetweenTimeEntriesAndProjects();
        this.isLoading = false;
        this.isError = false;
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
      }
    );
    // setting navigation for better ux
    this.router.navigate([], { queryParams: { week: param } });

    // setting default date to calendar to show
    this.dateCalendar = moment(this.week[0].date, ['YYYY-MM-DD']).toDate();
  }

  openDrawer(): void {
    this.isDrawerOpened = true;
  }

  createNewEntry(project: Project): void {
    const isEntryExistsInEntryList = this.timeEntries.some((el: TimeEntry) =>
      el.projectId === project.projectId
      && el.weekDays[0].status !== 'SUBMITTED'
    );
    if (isEntryExistsInEntryList) {
      return;
    }
    const newEntry: TimeEntry = this.timeEntryService
      .createAttributesForNewEntry(project, { year: this.displayedYear, week: this.displayedWeek });

    this.timeEntries = [...this.timeEntries, newEntry];
    this.getDifferenceBetweenTimeEntriesAndProjects();
  }

  getDifferenceBetweenTimeEntriesAndProjects() {
    const difference: Array<Project> = this.clientList
      .filter((project: Project) => !this.timeEntries.some(o => o.projectId === project.projectId));

    this.showingClientList = groupProjectsByClient(difference);
  }

  saveCurrentEntries() {
    this.timeEntries = this.timeEntries
      .filter((project: TimeEntry) => !project.weekDays.every((day: Day) => !day.hours))
      .map((project: TimeEntry) => (
        {
          ...project,
          weekDays: project.weekDays.map((day: Day) => (
            {
              ...day,
              status: day.status !== 'SAVED' ? 'SAVED' : day.status,
              comment: '',
            }
          )),
        })
      );

    this.sendData();
  }

  submitCurrentEntries() {
    this.timeEntries = this.timeEntries
      .filter((project: TimeEntry) => !project.weekDays.every((day: Day) => !day.hours))
      .map((project: TimeEntry) => (
        {
          ...project,
          weekDays: project.weekDays.map((day: Day) => (
            {
              ...day,
              status: day.status !== 'SUBMITTED' ? 'SUBMITTED' : day.status,
              comment: '',
            })
          ),
        })
      );

    this.sendData();
  }

  sendData() {
    if (!this.timeEntries.length) {
      this.snackBar.open('Data can not be send to server', '', { duration: 3000, horizontalPosition: 'left' });
      return;
    }
    this.isLoading = true;
    const param = `${this.displayedYear}-W${this.displayedWeek}`;
    const dataToSend = { weekTimeEntryBodyList: this.timeEntries.map(({ projectInfo, ...rest }) => rest) };

    // if there are links update current week
    if (this._links.self) {
      this.httpService.put(this._links.self.href, dataToSend)
        .subscribe(
          () => {
            this.fetchDataChangeRouteAndGetWeekDates();
            this.snackBar.open('Data has been successfully updated', 'X', {
              duration: 3000,
              horizontalPosition: 'left',
            });
          },
          () => {
            this.snackBar.open('Data has not been sent', 'X', { duration: 3000, horizontalPosition: 'left' });
          }
        );
      return;
    }

    // if there are no links from response we are sending new data
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.httpService.post(`consultants/${user.userId}/weeks/${param}`, dataToSend)
      .subscribe(
        () => {
          this.fetchDataChangeRouteAndGetWeekDates();
          this.snackBar.open('Data has been successfully sended', 'X', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        },
        () => {
          this.snackBar.open('Data has not been sent', 'X', { duration: 3000, horizontalPosition: 'left' });
        }
      );
  }
}
