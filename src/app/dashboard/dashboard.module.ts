import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { NavigationModule } from './navigation/navigation.module';
import { routerModule } from './dashboard.routing';
import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { TimeApprovalComponent } from './time-approval.component';
import { UserManagementModule } from './user-management/user-management.module';
import { NoRoleComponent } from './no-role.component';
import { ProjectManagementModule } from './project-management/project-management.module';

@NgModule({
  declarations: [
    DashboardComponent,
    TimeTrackingComponent,
    HistoricalDataComponent,
    ReportsComponent,
    TimeApprovalComponent,
    NoRoleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    routerModule,
    NavigationModule,
    UserManagementModule,
    ProjectManagementModule,
  ], exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
