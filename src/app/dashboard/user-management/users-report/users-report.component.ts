import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { MatTableDataSource } from '@angular/material';
import { user } from '../../../models';

@Component({
  selector: 'app-users-report',
  templateUrl: './users-report.component.html',
  styleUrls: ['./users-report.component.css']
 })
 export class UsersReportComponent implements OnInit {
  users: Array<user>;
  dataSource: MatTableDataSource<user>;
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
      (data: Array<user>) => {
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

  checkRole(user: user, role: string): boolean {
    let { roles } = user;
    if (roles == null) {
      roles = [];
    }
    return roles.some((e: string) => e === role);
  }

  updateRole(user: user, roleChanged: string) {
    const isUserHasRole: boolean = user.roles.some((role: string) => role === roleChanged);
    if (isUserHasRole) {
      user.roles = user.roles.filter((role: string) => role !== roleChanged);
    } else {
      user.roles = [...user.roles, roleChanged];
    }
    this.updateUserData(user);

  }

  updateActive(user: user): void {
    user.active = !user.active;
    this.updateUserData(user);
  }

  updateUserData(user: user): void {
    this.userManagementService.updateUsers(user)
      .subscribe(() => {
        this.userManagementService.changeReloadStatus();
      });
  }
 }
