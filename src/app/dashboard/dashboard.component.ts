import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';


import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { TimeApprovalComponent } from './time-approval.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { RoleAuthService } from './roleAuth.service';

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  links = [];
  constructor(
    private roleAuthService: RoleAuthService
    ) {}

  ngOnInit() {
    this.roleAuthService.getLinks().subscribe(links => {
      this.links = links;
    });
  }
}
