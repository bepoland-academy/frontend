import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { MatTableDataSource } from '@angular/material';
import { User } from '../../../models';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.css'],
 })
 export class UsersReportComponent implements OnInit {
  users: Array<User>;
  dataSource: MatTableDataSource<User>;
  displayedColumns = ['employee', 'role', 'department', 'active'];
  isDataAvailable = false;
  isResponse = false;
  serverError = false;

  constructor(
    private userManagementService: UserManagementService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.userManagementService.getReloadStatus().subscribe(() => {
      this.getUsersData();
    });
  }

  getUsersData(): void {
    this.userManagementService.getUsers()
    .subscribe(
      (response) => {
        const data: Array<User> = response._embedded.userBodyList;
        this.users = data;
        this.dataSource = new MatTableDataSource(this.users);
        this.isResponse = true;
        this.isDataAvailable = true;
        this.changeDetectorRefs.detectChanges();
      },
      () => {
        this.serverError = true;
        this.isResponse = true;
      });
  }

  checkRole(user: User, role: string): boolean {
    let { roles } = user;
    if (roles == null) {
      roles = [];
    }
    return roles.some((e: string) => e === role);
  }

  updateRole(user: User, roleChanged: string) {
    const isUserHasRole: boolean = user.roles.some((role: string) => role === roleChanged);
    if (isUserHasRole) {
      user.roles = user.roles.filter((role: string) => role !== roleChanged);
    } else {
      user.roles = [...user.roles, roleChanged];
    }
    this.updateUserData(user);

  }

  updateActive(user: User): void {
    user.active = !user.active;
    this.updateUserData(user);
  }

  updateUserData(user: User): void {
    this.userManagementService.updateUsers(user)
      .subscribe(() => {
        this.userManagementService.changeReloadStatus();
      });
  }
 }
