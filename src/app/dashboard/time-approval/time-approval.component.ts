import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimeApprovalService } from './time-approval.service';
import { UserTimeMonthlyResponse } from '../../core/models';
import * as _ from 'lodash';

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
  currentUser: string;

  constructor(private timeApprovalService: TimeApprovalService) { }

  ngOnInit() {
    this.timeApprovalService.getUsersTime().then((users: Array<UserTimeMonthlyResponse>) => {
      console.log(users);
      this.sortUsersTimeData(users);
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

  sortUsersTimeData(users) {
    const x = users;
    console.log(x);
        // Assign overall status to each user
    for (let i = 0; i < x.length; i++) {
      console.log(x[i].lastName);
      // for (let j = 0; j < users[i].month.length; j++) {
      //   for (let k = 0; k < users[i].month[j].monthDays.length; k++) {
      //     if (users[i].month[j].monthDays[k].status === 'SUBMITTED') {
      //       // array[i] = {...array[i], overallStatus: 'submitted'};
      //       console.log(users[i].lastName);
      //     } else {
      //       //  array[i] = {...array[i], overallStatus: 'notSubmitted'};
      //       console.log('nothing found');
      //     }
      //   }
      // }
    }

    // sortUsers(users);
    this.usersTime = users.sort((a) => (a.overallStatus !== 'submitted') ? 1 : -1);
    this.usersTime = users.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
  }

  handleUserClick(event) {
    this.sidenavOpen = false;
    this.toggleButtonVisible = true;
    this.currentUser = event.event.lastName + ' ' + event.event.firstName;
  }

  showSidenav() {
    this.sidenavOpen = true;
    this.toggleButtonVisible = false;
  }

}
