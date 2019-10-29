import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { TimeEntryComponent } from './time-entry/time-entry.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { TimeApprovalComponent } from './time-approval/time-approval.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NoRoleComponent } from './no-role.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ReportsComponent } from './reports/reports.component';
import { ProjectWithoutClient, Client } from '../core/models';
import { GlobalDataService } from '../core/services/global-data.service';

@Component({
  selector: 'app-dashboard',
  template: `
      <app-navigation></app-navigation>
      <router-outlet *ngIf="showRouter"></router-outlet>
      <app-error *ngIf="error"></app-error>
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
  error: boolean;
  constructor(
    private globalData: GlobalDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.globalData.getGlobalData()
      .subscribe(
        (projectsAndClients: [ProjectWithoutClient[], Client[]]) => {
          if (projectsAndClients[0].length) {
            this.showRouter = true;
            this.error = false;
            this.globalData.setClients = projectsAndClients[1];
            this.globalData.setProjects = projectsAndClients[0];
          }
        },
        () => {
          this.snackBar.open('App will not correctly working', 'X', { duration: 5000 });
          this.error = true;
        }
      );
  }

  ngOnDestroy(): void {
    this.showRouter = false;
  }
}
