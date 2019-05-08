import { Component, OnInit, OnDestroy } from '@angular/core';

import { TimeEntryComponent } from './time-entry/time-entry.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { TimeApprovalComponent } from './time-approval/time-approval.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NoRoleComponent } from './no-role.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ReportsComponent } from './reports/reports.component';
import { HttpService } from '../core/services/http.service';
import { Project } from '../core/models';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-dashboard',
  template: `
      <app-navigation></app-navigation>
      <router-outlet *ngIf="showRouter"></router-outlet>
  `,
  styles: [],
  entryComponents: [
    TimeEntryComponent,
    HistoricalDataComponent,
    ProjectManagementComponent,
    TimeApprovalComponent,
    UserManagementComponent,
    ClientManagementComponent,
    RoleManagementComponent,
    NoRoleComponent,
    ReportsComponent,
  ],
})
export class DashboardComponent implements OnInit, OnDestroy {
  showRouter: boolean;
  constructor(
    private httpService: HttpService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.httpService.fetchProjects().subscribe(
      (projects: Array<Project>) => {
        if (projects.length) {
          this.showRouter = true;
        }
      },
      () => this.snackBar.open('Something went wrong, app would not work correctly', 'X', { duration: 5000 })
    );
  }

  ngOnDestroy(): void {
    this.showRouter = false;
  }
}
