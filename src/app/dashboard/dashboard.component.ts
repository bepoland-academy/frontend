import { Component, OnInit } from '@angular/core';

import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { TimeApprovalComponent } from './time-approval.component';
import { UserManagementComponent } from './user-management/user-management.component';

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
    ProjectManagmentComponent,
    TimeApprovalComponent,
    UserManagementComponent
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {

  }

}
