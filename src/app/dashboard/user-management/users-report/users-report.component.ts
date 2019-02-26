import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.css'],
  styles: ['.hidden {display: none}']
})
export class UsersReportComponent implements OnInit {
  users: any;
  dataSource: any;
  displayedColumns = ['employee', 'role', 'department', 'active'];
  isDataAvailable = false;
  reloadPage: string;
  isResponse = false;
  serverError = false;

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit() {
    this.getUsersData();
    this.userManagementService.notTriggerReload.subscribe(message => this.reloadPage = message);
    console.log(this.reloadPage);
  }

  ngDoCheck() {
    if (this.reloadPage !== 'false') {
      this.ngOnInit();
    }
    console.log(this.reloadPage);
  }

  getUsersData() {
    this.userManagementService.getUsers()
    .subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      //console.log(this.dataSource);
      this.isResponse = true;
      this.isDataAvailable = true;
    },
    error => {
      this.serverError = true;
      this.isResponse = true;

      console.log(error);
    });
  }

  checkRole(user, roleChanged) {
    const result = user.roles.some(e => e === roleChanged);
    return result;
  }

  updateRole(event: any, user, roleChanged) {
    const isAdded = event.checked;
    const id = user.userId;
    const roles = user.roles;
    const present = roles.some(e => e === roleChanged);
 
    if (isAdded) {
       roles.push(roleChanged);
    } else if (roles.length === 1) {
      return;
    } else {
     for ( let i = 0; i < roles.length; i++) {
       if ( roles[i] === roleChanged) {
         roles.splice(i, 1);
       }
    }
    }
 
    user.roles = roles;

   this.changeUserData(user);
  }

  updateActive(user: any) {
    user.active = !user.active;
    console.log(user.active);
    this.changeUserData(user);
  }

  changeUserData(user) {
    this.userManagementService.updateUsers(user, user.userId)
    .subscribe(data => {
      console.log(data);
      this.ngOnInit();
    },
    error => {
     console.log(error, user);
    });
  }
  

  
}

export interface User {
  employee: string;
  role: Array<string>;
  department: string;
  active: string;
}




