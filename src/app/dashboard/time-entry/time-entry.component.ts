import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { forkJoin, of } from 'rxjs';

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
  User,
  TimeEntryWithoutProjectInfo
} from '../../core/models';
import { groupProjectsByClient } from 'src/app/shared/utils/groupProjectsByClient';

const getDifferenceBetweenEntries = (
  entriesFromApi: Array<TimeEntry>,
  currentEntries: Array<TimeEntry>,
  status: string
) => {
  return entriesFromApi.map((project, index) => {
    const {projectInfo, ...restProjectAttributes} = project;
    return {
      ...restProjectAttributes,
      weekDays: project.weekDays.map((day: Day, i: number) => {
        const dayFromCurrentEntries: Day = currentEntries[index].weekDays[i];
        const areDaysHaveSameHours: boolean = dayFromCurrentEntries.hours === day.hours;
        return {
          ...day,
          hours: areDaysHaveSameHours ? day.hours : dayFromCurrentEntries.hours,
          status: areDaysHaveSameHours ? day.status : status,
        };
      }),
    };
  });
};

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css'],
})
export class TimeEntryComponent implements OnInit {
  timeEntries: Array<TimeEntry> = [];
  timeEntriesFromApi: Array<TimeEntry> = [];

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
  doUsunieciaNapewno: boolean;
  timeout: number;

  constructor(
    private timeEntryService: TimeEntryService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // if there is no param defined we are defining it at constructor so we can on method ngOnInit get defined param
    // because we could be redirected to time entry page from Historical Data component
    if (!this.activeRoute.snapshot.queryParamMap.has('week')) {
      const year = moment().year();
      const currentWeek = moment().format('ww');
      this.router.navigate([], { queryParams: { week: `${year}-W${currentWeek}` } });
    }

    this.activeRoute.queryParamMap.subscribe((params: Params) => {
      if (params.has('week')) {
        const weekParam: string = params.get('week');
        this.currentYear = moment().year();
        this.currentWeek = moment().week();
        this.displayedWeek = +weekParam.substr(6, 2);
        this.displayedYear = +weekParam.substr(0, 4);
        this.week = this.timeEntryService.getFullWeekDaysWithDate(this.displayedYear, this.displayedWeek);
        this.fetchDataChangeRouteAndGetWeekDates();
      }
    });
  }

  isDayRejected(): boolean {
    return this.timeEntries.some(el => el.weekDays.some(o => o.status === 'REJECTED'));
  }

  getPreviousWeek(): void {
    this.displayedWeek = +this.displayedWeek - 1;
    if (this.displayedWeek < 1) {
      this.displayedYear -= 1;
      this.displayedWeek = 52;
    }
    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.displayedYear, +this.displayedWeek);
    this.dateCalendar = moment(this.week[0].date, ['YYYY-MM-DD']).toDate();
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      const param = `${this.displayedYear}-W${this.displayedWeek}`;
      this.router.navigate([], { queryParams: { week: param } });
    }, 300);
  }

  getNextWeek(): void {
    this.displayedWeek = +this.displayedWeek + 1;
    if (this.displayedWeek > 52) {
      this.displayedYear += 1;
      this.displayedWeek = 1;
    }
    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.displayedYear, +this.displayedWeek);
    this.dateCalendar = moment(this.week[0].date, ['YYYY-MM-DD']).toDate();
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      const param = `${this.displayedYear}-W${this.displayedWeek}`;
      this.router.navigate([], { queryParams: { week: param } });
    }, 300);
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
    this.dateCalendar = moment(this.week[0].date, ['YYYY-MM-DD']).toDate();
    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.displayedYear, +this.displayedWeek);
    const param = `${this.displayedYear}-W${this.displayedWeek}`;
    this.router.navigate([], { queryParams: { week: param } });
  }

  setToCurrentDate(): void {
    this.displayedWeek = this.currentWeek;
    this.displayedYear = this.currentYear;
    this.week = this.timeEntryService.getFullWeekDaysWithDate(this.displayedYear, +this.displayedWeek);
    const param = `${this.displayedYear}-W${this.displayedWeek}`;
    this.router.navigate([], { queryParams: { week: param } });
  }

  removeProject(timeEntry: TimeEntry): void {
    if (timeEntry._links) {
      this.httpService.delete(timeEntry._links.DELETE.href).subscribe(() => {
        this.snackBar.open(`Project ${timeEntry.projectInfo.name} was succesfully removed`, 'X', {duration: 2000});
        this.fetchDataChangeRouteAndGetWeekDates();
      });
      return;
    }
    this.timeEntries = this.timeEntries.filter((el: TimeEntry) => el.projectId !== timeEntry.projectId);
    this.showAvaibleProjectsThatUserCanSelect();
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

    // fetching data
    this.timeEntryService.fetchTracks(param).subscribe(
      (response: TimeEntriesWithLinksAndProjects) => {
        this.timeEntries = JSON.parse(JSON.stringify(response.timeEntries));
        this.timeEntriesFromApi = JSON.parse(JSON.stringify(response.timeEntries));
        this._links = response._links;
        this.clientList = response.projectList;
        this.showAvaibleProjectsThatUserCanSelect();
        this.isLoading = false;
        this.isError = false;
      },
      (err) => {
        this.isError = true;
        this.isLoading = false;
      }
    );

    this.displayedWeek = +this.displayedWeek;
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
    this.showAvaibleProjectsThatUserCanSelect();
  }

  // filtering projects that user is assigned and he didn't have them in timesheet
  showAvaibleProjectsThatUserCanSelect() {
    const difference: Array<Project> = this.clientList
      .filter((project: Project) => !this.timeEntries.some(o => o.projectId === project.projectId));

    this.showingClientList = groupProjectsByClient(difference);
  }

  saveCurrentEntries() {
    this.checkForNewEntries().subscribe(() => {
      const differenceBetweenEntries: Array<TimeEntryWithoutProjectInfo> = getDifferenceBetweenEntries(
          this.timeEntriesFromApi, this.timeEntries, 'SAVED'
        );
      this.sendData(differenceBetweenEntries);
    });

  }

  submitCurrentEntries() {
    this.checkForNewEntries().subscribe(() => {
      const differenceBetweenEntries: Array<TimeEntryWithoutProjectInfo> = getDifferenceBetweenEntries(
          this.timeEntriesFromApi, this.timeEntries, 'SUBMITTED'
        );
      this.sendData(differenceBetweenEntries);
    });

  }

  sendData(data: Array<TimeEntryWithoutProjectInfo>) {
    if (!this.timeEntries.length) {
      this.snackBar.open('You need to add project to send it to the server', '', {
        duration: 3000,
        horizontalPosition: 'left',
      });
      return;
    }

    this.isLoading = true;
    const param = `${this.displayedYear}-W${this.displayedWeek}`;
    const dataToSend = { weekTimeEntryBodyList: data };

    // if there are links update current week
    if (this._links.self && !this.doUsunieciaNapewno) {
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
          this.doUsunieciaNapewno = false;
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

  checkForNewEntries() {
    const isAnyNewProject = this.timeEntries.some(o => !o.weekDays[0].status);
    const isAnyAddedProject = this.timeEntries.some(o => !!o.weekDays[0].status);
    if (isAnyNewProject && isAnyAddedProject) {
      this.doUsunieciaNapewno = true;
      const doUsuniecia = this.timeEntries.filter(el => el._links);
      return forkJoin(
        doUsuniecia.map(el => {
          return this.httpService.delete(el._links.DELETE.href);
        })
      );
    }
    return of(null);
  }
}
