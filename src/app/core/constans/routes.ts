import { Routes } from '@angular/router';

import { TimeEntryComponent } from 'src/app/dashboard/time-entry/time-entry.component';
import { HistoricalDataComponent } from 'src/app/dashboard/historical-data/historical-data.component';
import { ReportsComponent } from 'src/app/dashboard/reports/reports.component';
import { ProjectManagementComponent } from 'src/app/dashboard/project-management/project-management.component';
import { TimeApprovalComponent } from 'src/app/dashboard/time-approval/time-approval.component';
import { UserManagementComponent } from 'src/app/dashboard/user-management/user-management.component';
import { ClientManagementComponent } from 'src/app/dashboard/client-management/client-management.component';
import { RoleManagementComponent } from 'src/app/dashboard/role-management/role-management.component';

export const mainRoutes: Routes = [
  {
    path: 'track',
    component: TimeEntryComponent,
    data: { name: 'Time entry', forRole: ['CONSULTANT', 'MANAGER', 'ADMINISTRATION'] },
  },
  {
    path: 'history',
    component: HistoricalDataComponent,
    data: { name: 'Historical data', forRole: ['CONSULTANT', 'MANAGER', 'ADMINISTRATION'] },
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { name: 'Reports', forRole: ['MANAGER', 'ADMINISTRATION'] },
  },
  {
    path: 'projects',
    component: ProjectManagementComponent,
    data: { name: 'Project management', forRole: ['ADMINISTRATION'] },
  },
  {
    path: 'approval',
    component: TimeApprovalComponent,
    data: { name: 'Time approval', forRole: ['MANAGER'] },
  },
  {
    path: 'users',
    component: UserManagementComponent,
    data: {
      name: 'User management',
      forRole: ['ADMINISTRATION'],
    },
  },
  {
    path: 'clients',
    component: ClientManagementComponent,
    data: {
      name: 'Client management',
      forRole: ['ADMINISTRATION'],
    },
  },
  {
    path: 'roles',
    component: RoleManagementComponent,
    data: {
      name: 'Role management',
      forRole: ['ADMINISTRATION'],
    },
  },
];
