import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeApprovalService } from './time-approval.service';
import { UserWithTimeSheet, Project, MonthTimeEntry, MonthTimeEntryWithoutProjectInfo, User } from '../../core/models';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { HttpService } from 'src/app/core/services/http.service';
import { CalendarComponent } from 'src/app/shared/calendar/calendar.component';

interface NextApprovalResponse {
  _embedded: {
    monthBoList: Array<{month: string}>
  };
}

@Component({
  selector: 'app-time-approval',
  templateUrl: './time-approval.component.html',
  styleUrls: ['./time-approval.component.css'],
  })
export class TimeApprovalComponent implements OnInit {
  @ViewChild('calendar') calendarComponent: CalendarComponent;
  usersWithTimeEntries: Array<UserWithTimeSheet> = [];
  errorMessage: string;
  sidenavOpen = true;
  toggleButtonVisible = false;
  currentUser: UserWithTimeSheet;

  constructor(
    private timeApprovalService: TimeApprovalService,
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    const year: number = moment().year();
    let month: number | string = moment().month() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const currentMonth = `${year}-${month}`;
    this.timeApprovalService.getProjects().subscribe((projects: Array<Project>) => {
      // call for users if projects fetch ends
      if (projects.length) {
        this.timeApprovalService.getUsersWithTimeEntries(currentMonth).subscribe(
          (users: Array<UserWithTimeSheet>) => {
            this.usersWithTimeEntries = users;
          },
          (err) => {
            this.snackBar.open('Something went wrong on server');
          }
        );
      }
    });
  }

  setCurrentUser(user: UserWithTimeSheet) {
    this.sidenavOpen = false;
    this.toggleButtonVisible = true;
    this.currentUser = user;
  }

  updateCurrentUser(user: UserWithTimeSheet) {
    this.currentUser = user;
  }

  showSidenav() {
    this.sidenavOpen = true;
    this.toggleButtonVisible = false;
  }

  approveAll() {
    const dataToSend: Array<MonthTimeEntryWithoutProjectInfo> = this.currentUser.monthTimeSheet
      .map((timeSheet: MonthTimeEntry) => {
        const { projectInfo, ...rest } = timeSheet;
        return {
          ...rest,
          monthDays: rest.monthDays.map(item =>
            item.status === 'SUBMITTED' ? { ...item, status: 'APPROVED', comment: '' } : item),
        };
      })
      .map((el: MonthTimeEntryWithoutProjectInfo) => (
        {...el, monthDays: el.monthDays.filter(a => a.status !== 'SAVED') }
      ));

    this.httpService.put(this.currentUser._links.self.href, { monthTimeEntryBodyList: dataToSend})
      .subscribe(
        () => {
          this.calendarComponent.fetchUserInfo(this.currentUser._links.self.href);
          this.snackBar.open('Data has been successfully updated', 'X', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        },
        () => {
          this.snackBar.open('Data has not been sent', 'X', { duration: 3000, horizontalPosition: 'left' });
        }
      );
  }

  setStatusForOneDay({status, date, comment = ''}) {
    console.log('TCL: TimeApprovalComponent -> setStatusForOneDay -> status', status);
  const dataToSend: Array<MonthTimeEntryWithoutProjectInfo> = this.currentUser.monthTimeSheet
      .map((timeSheet: MonthTimeEntry) => {
        const {projectInfo, ...rest} = timeSheet;
        return {
          ...rest,
          monthDays: rest.monthDays
            .filter(day => day.date === date && day.status !== 'SAVED')
            .map(day => ({...day, status, comment})),
        };
      })
      .filter((timeSheet: MonthTimeEntry) => timeSheet.monthDays.length);

  this.httpService.put(this.currentUser._links.self.href, { monthTimeEntryBodyList: dataToSend })
      .subscribe(
        () => {
          this.calendarComponent.fetchUserInfo(this.currentUser._links.self.href);
          this.snackBar.open('Data has been successfully updated', 'X', {
            duration: 3000,
            horizontalPosition: 'left',
          });
        },
        () => {
          this.snackBar.open('Data has not been sent', 'X', { duration: 3000, horizontalPosition: 'left' });
        }
      );
  }

  getMoreTimeSheetsToApprove(link: string) {
    const loggedInUser: User = JSON.parse(localStorage.getItem('user'));
    this.httpService.get(`consultants/${loggedInUser.userId}/months/status/SUBMITTED`)
      .subscribe((response: NextApprovalResponse) => {
        if (!response._embedded) {
          this.snackBar.open('There is no more time entries to approve', 'X', { duration: 3000, horizontalPosition: 'left' });
          return;
        }
        const date = response._embedded.monthBoList[0].month;
        this.calendarComponent.currentDate = moment(date, 'YYYY-MM').toDate();
        this.calendarComponent.fetchUserInfo(link + date);
      });
  }
}
