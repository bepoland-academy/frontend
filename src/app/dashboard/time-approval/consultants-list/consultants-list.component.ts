import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimeApprovalService } from '../time-approval.service';
import { User, UsersResponse, UserTimeMonthly } from '../../../core/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-consultants-list',
  templateUrl: './consultants-list.component.html',
  styleUrls: ['./consultants-list.component.css'],
})
export class ConsultantsListComponent implements OnInit {

  @Output() consultantClick = new EventEmitter<null>();
  usersByDepartment: Array<User>;
  users: Observable<any>;
  usersTime: Array<UserTimeMonthly> = [];
  monthNumber: string;

  constructor(
    private timeApprovalService: TimeApprovalService
  ) { }

  ngOnInit() {
    const manager = JSON.parse(localStorage.getItem('user'));
    this.monthNumber = '1';
    console.log(manager.department);

    // Get all users from the Manager's department
    this.timeApprovalService.getUsers(manager.department).subscribe(
      (users: UsersResponse) => {
        this.usersByDepartment = users._embedded.userBodyList;
        console.log(this.usersByDepartment);
      }
    );

    // Map over each user in the Department and take his TimeEntry Data
    // (separate getRequest for each user in the Department)
    setTimeout(() => {
      this.usersByDepartment.map((user) => {
        this.getUserTime(manager.userId, user.userId, user.firstName, user.lastName, this.monthNumber);
        console.log(manager.userId, user.userId);
      });
    }, 3000);
  }


  getUserTime(managerId: string, consultantId: string, firstName: string, lastName: string, monthNumber: string) {
    this.timeApprovalService.getUsersTime(managerId, consultantId, monthNumber).subscribe(
      (data: UserTimeMonthly) => {
        const userTime = {...data, firstName, lastName};
        this.usersTime = this.usersTime.concat(userTime);

        // Assign overall status to each user
        const users = ((x) => {
          for (let i = 0; i < this.usersTime.length; i++) {
            for (let j = 0; j < this.usersTime[i].monthDays.length; j++) {
               if (x[i].monthDays[j].status === 'submitted') {
                 x[i] = {...this.usersTime[i], overallStatus: 'submitted'};
               } else {
                x[i] = {...this.usersTime[i], overallStatus: 'notSubmitted'};
               }
            }
        }
        });

        this.usersTime.sort((a, b) => (a.lastName > b.lastName) ? 1 : -1);
        users(this.usersTime);
        this.usersTime.sort((a) => (a.overallStatus !== 'submitted') ? 1 : -1);
      },
      (error) => {
        console.log(error);
      });
  }

  askToHide() {
    this.consultantClick.emit();
  }

}
