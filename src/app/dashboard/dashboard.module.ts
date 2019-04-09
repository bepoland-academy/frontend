import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { DashboardComponent } from './dashboard.component';
import { NavigationModule } from './navigation/navigation.module';
import { routerModule } from './dashboard.routing';
import { ReportsComponent } from './reports.component';
import { UserManagementModule } from './user-management/user-management.module';
import { NoRoleComponent } from './no-role.component';
import { TimeEntryModule } from './time-entry/time-entry.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { TimeApprovalModule } from './time-approval/time-approval.module';
import { HistoricalDataModule } from './historical-data/historical-data.module';
import { ClientManagementModule } from './client-management/client-management.module';
import { RoleManagementModule } from './role-management/role-management.module';

@NgModule({
  declarations: [
    DashboardComponent,
    ReportsComponent,
    NoRoleComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    routerModule,
    NavigationModule,
    UserManagementModule,
    TimeEntryModule,
    ProjectManagementModule,
    TimeApprovalModule,
    HistoricalDataModule,
    ClientManagementModule,
    RoleManagementModule,
  ],
  exports: [
    DashboardComponent,
  ],
})
export class DashboardModule { }
