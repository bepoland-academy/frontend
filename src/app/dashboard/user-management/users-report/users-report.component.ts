import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { MatTableDataSource } from '@angular/material';
import { User, Department, DepartmentsResponse } from '../../../core/models';
import { UsersResponse } from 'src/app/core/models/user.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  departments: Array<Department>;

  constructor(
    private userManagementService: UserManagementService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getDepartments().subscribe((departments) => {
      this.userManagementService.getReloadStatus().subscribe(() => {
        this.getUsersData(departments);
      });
    });

  }

  getDepartments(): Observable<any> {
    return this.userManagementService.getDepartments()
    .pipe(
      map((response: DepartmentsResponse) => {
        return this.departments = response._embedded.departmentBodyList;
      }));
  }

  getUsersData(departments): void {
    this.userManagementService.getUsers()
      .subscribe(
        (response: UsersResponse) => {
          let data = response._embedded.userBodyList;
          data = data.map(el => ({ ...el, department: departments.find(a => a.departmentId === el.department).name }));
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
      },
        () => {
          this.serverError = true;
          this.isResponse = true;
        });
    setTimeout(() => {
      this.serverError = false;
    }, 3000);
  }
}
