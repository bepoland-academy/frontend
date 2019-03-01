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
  
  checkRole(user: any, roleChanged: string) {
   const result = user.roles.some((e: string) => e === roleChanged);
   return result;
  }
 
  updateRole(event: any, user: any, roleChanged: string) {
    console.log(event, user, roleChanged);
   const isAdded = event.checked;
   let roles = user.roles;
 
   if (isAdded) {
    roles.push(roleChanged);
   } else {
     roles = roles.filter(el => el !== roleChanged)
   }
 
   user.roles = roles;
   this.changeUserData(user);
  }
 
  updateActive(user: any) {
   user.active = !user.active;
   this.changeUserData(user);
  }
 
  changeUserData(user: any) {
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
  role: Array<string> ;
  department: string;
  active: boolean;
 }



