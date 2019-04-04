import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimeApprovalService } from './time-approval.service';
import { UserTimeMonthlyResponse } from '../../core/models';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-time-approval',
  templateUrl: './time-approval.component.html',
  styleUrls: ['./time-approval.component.css'],
  })

export class TimeApprovalComponent implements OnInit {

  usersTime: Array<UserTimeMonthlyResponse> = [];
  errorMessage: string;
  sidenavOpen = true;
  toggleButtonVisible = false;
  currentUser: any;

  constructor(private timeApprovalService: TimeApprovalService) { }

  ngOnInit() {
    const year = moment().year();
    let month: any = moment().month() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    const currentMonth = `${year}-${month}`;
    this.timeApprovalService.getUsersTime(currentMonth).subscribe((users) => {
      this.usersTime = users;
    });
  }

  handleUserClick(user) {
    this.timeApprovalService.reloadCalendar(user);
    this.sidenavOpen = false;
    this.toggleButtonVisible = true;
    this.currentUser = true;
  }

  showSidenav() {
    this.sidenavOpen = true;
    this.toggleButtonVisible = false;
  }

}
