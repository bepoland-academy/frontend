import { Component } from '@angular/core';

import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { TimeApprovalComponent } from './time-approval.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NoRoleComponent } from './no-role.component';
import { ProjectManagementComponent } from './project-management/project-management.component';

@Component({
  selector: 'app-dashboard',
  template: `
      <app-navigation></app-navigation>
      <router-outlet></router-outlet>
  `,
  styles: [],
  entryComponents: [
    TimeTrackingComponent,
    HistoricalDataComponent,
    ReportsComponent,
    ProjectManagementComponent,
    TimeApprovalComponent,
    UserManagementComponent,
    NoRoleComponent,
  ],
})
export class DashboardComponent {
  constructor() {}
}
