import { Component } from '@angular/core';

import { TimeEntryComponent } from './time-entry/time-entry.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { TimeApprovalComponent } from './time-approval.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { NoRoleComponent } from './no-role.component';

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
    ReportsComponent,
    ProjectManagmentComponent,
    TimeApprovalComponent,
    UserManagementComponent,
    NoRoleComponent,
  ],
})
export class DashboardComponent {
  constructor() {}
}
