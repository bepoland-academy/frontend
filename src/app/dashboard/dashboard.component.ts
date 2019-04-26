import { Component } from '@angular/core';

import { TimeEntryComponent } from './time-entry/time-entry.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { TimeApprovalComponent } from './time-approval/time-approval.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NoRoleComponent } from './no-role.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { ClientManagementComponent } from './client-management/client-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { ReportsComponent } from './reports/reports.component';

@Component({
  selector: 'app-dashboard',
  template: `
      <app-navigation></app-navigation>
      <router-outlet></router-outlet>
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
export class DashboardComponent {
  constructor() {}
}
