import { NgModule,  } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { NavigationModule } from './navigation/navigation.module';
import { routerModule } from './dashboard.routing';
import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { TimeApprovalComponent } from './time-approval.component';
import { UserManagementModule } from './user-management/user-management.module';
import { NoRoleComponent } from './no-role.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TimeTrackingComponent,
    HistoricalDataComponent,
    ReportsComponent,
    ProjectManagmentComponent,
    TimeApprovalComponent,
    NoRoleComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    routerModule,
    NavigationModule,
    UserManagementModule
  ], exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
