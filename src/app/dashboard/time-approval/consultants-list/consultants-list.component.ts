import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TimeApprovalService } from '../time-approval.service';
import { addNameById } from 'src/app/shared/utils/addNameById';
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
    this.timeApprovalService.getUsers().subscribe(
      (users: UsersResponse) => {
        this.usersByDepartment = users._embedded.userBodyList.filter((user) => {
          return user.department === manager.department;
        });
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
        console.log(this.usersTime);
      },
      (error) => {
        console.log(error);
      });
  }

  askToHide() {
    this.consultantClick.emit();
  }

}




// import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { TimeApprovalService } from '../time-approval.service';
// import { addNameById } from 'src/app/shared/utils/addNameById';
// import { User, UsersResponse, UserTimeMonthly } from '../../../core/models';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-consultants-list',
//   templateUrl: './consultants-list.component.html',
//   styleUrls: ['./consultants-list.component.css'],
// })
// export class ConsultantsListComponent implements OnInit {

//   @Output() consultantClick = new EventEmitter<null>();
//   usersByDepartment: Array<User>;
//   users: Observable<any>;
//   usersTime: Array<UserTimeMonthly> = [];
//   monthNumber: string;

//   constructor(
//     private timeApprovalService: TimeApprovalService
//   ) { }

//   ngOnInit() {
//     const manager = JSON.parse(localStorage.getItem('user'));
//     this.monthNumber = '1';
//     console.log(manager.department);

//     // Get all users from the Manager's department
//     this.timeApprovalService.getUsers().subscribe(
//       (users: UsersResponse) => {
//         this.usersByDepartment = users._embedded.userBodyList.filter((user) => {
//           return user.department === manager.department;
//         });
//         console.log(this.usersByDepartment);
//       }
//     );

//     // Map over each user in the Department and take his TimeEntry Data
//     // (separate getRequest for each user in the Department)
//     setTimeout(() => {
//       this.usersByDepartment.map((user) => {
//         this.getUserTime(manager.userId, user.userId, user.firstName, user.lastName, this.monthNumber);
//         console.log(manager.userId, user.userId);
//       });
//     }, 3000);
//   }

//   getUserTime(managerId: string, consultantId: string, firstName: string, lastName: string, monthNumber: string) {
//     this.timeApprovalService.getUsersTime(managerId, consultantId, monthNumber).subscribe(
//       (data: UserTimeMonthly) => {
//         const userTime = {...data, firstName, lastName};
//         this.usersTime = this.usersTime.concat(userTime);
//         console.log(this.usersTime);
//       },
//       (error) => {
//         console.log(error);
//       });
//   }

//   askToHide() {
//     this.consultantClick.emit();
//   }

// }
