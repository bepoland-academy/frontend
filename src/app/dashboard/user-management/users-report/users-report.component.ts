import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.css'],
 })
 export class UsersReportComponent implements OnInit {
  users: any;
  dataSource: any;
  displayedColumns = ['employee', 'role', 'department', 'active'];
  isDataAvailable = false;
  isResponse = false;
  serverError = false;
 
  constructor(private userManagementService: UserManagementService,
    private changeDetectorRefs: ChangeDetectorRef) {}
 
  ngOnInit() {
   this.userManagementService.getReloadStatus().subscribe(newData => {
    this.getUsersData();
    });
  }
 
  getUsersData() {
    this.userManagementService.getUsers()
    .subscribe(data => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.isResponse = true;
      this.isDataAvailable = true;
      this.changeDetectorRefs.detectChanges();
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
   const roles = user.roles;
 
   if (isAdded) {
    roles.push(roleChanged);
   } else {
    for (let i = 0; i < roles.length; i++) {
     if (roles[i] === roleChanged) {
      roles.splice(i, 1);
     }
    }
   }
 
   user.roles = roles;
   this.changeUserData(user);
  }
 
  updateActive(user: any) {
   user.active = !user.active;
   this.changeUserData(user);
  }
 
  changeUserData(user) {
   this.userManagementService.updateUsers(user, user.userId)
    .subscribe(data => {
      this.ngOnInit();
     },
     error => {
      console.log(error, user);
     });
  }
 }
 
 export interface User {
  employee: string;
  role: Array < string > ;
  department: string;
  active: string;
 }



