import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimeApprovalService } from './time-approval.service';
import { UserTimeMonthly } from '../../core/models';
import * as _ from 'lodash';

@Component({
  selector: 'app-time-approval',
  templateUrl: './time-approval.component.html',
  styleUrls: ['./time-approval.component.css'],
  })

export class TimeApprovalComponent implements OnInit {

  usersTime: Array<UserTimeMonthly> = [];
  errorMessage: string;
  sidenavOpen = true;
  toggleButtonVisible = false;

  constructor(private timeApprovalService: TimeApprovalService) { }

  ngOnInit() {
    this.timeApprovalService.getUsersTime().then((users: Array<UserTimeMonthly>) => {
      this.usersTime = users;
      // this.sortUsersTimeData(users);
    })
    .catch((error) => {
      if ((/^[5]/g).test(error.status)) {
        this.errorMessage = `Oh no! Something bad happened.
        Please come back later when we fixed that problem. Thanks`;
      } else {
        this.errorMessage = 'Please check your Internet connection';
      }
    });
  }

  // sortUsersTimeData(users: Array<UserTimeMonthly>) {

  //       // Assign overall status to each user
  //   const sortUsers = ((array: Array<UserTimeMonthly>) => {
  //         for (let i = 0; i < array.length; i++) {
  //           for (let j = 0; j < array[i].monthDays.length; j++) {
  //              if (array[i].monthDays[j].status === 'submitted') {
  //                array[i] = {...array[i], overallStatus: 'submitted'};
  //              } else {
  //               array[i] = {...array[i], overallStatus: 'notSubmitted'};
  //              }
  //           }
  //       }
  //       });

  //   sortUsers(users);
  //   this.usersTime = users.sort((a) => (a.overallStatus !== 'submitted') ? 1 : -1);
  //   this.usersTime = users.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
  // }

  hideSidenav() {
    this.sidenavOpen = false;
    this.toggleButtonVisible = true;
  }

  showSidenav() {
    this.sidenavOpen = true;
    this.toggleButtonVisible = false;
  }


}
