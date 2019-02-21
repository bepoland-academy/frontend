import { Injectable } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { Subject } from 'rxjs';

import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { TimeApprovalComponent } from './time-approval.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { LoginComponent } from './login/login.component';

@Injectable()
export class RoleAuthService {
  role = ['consultant', 'manager', 'administrator'];
  routes: Routes = [
    { path: '', component: LoginComponent, children: [
      { path: 'track', component: TimeTrackingComponent, data: { name: 'Time tracking', forRole: ['consultant', 'manager', 'administrator'] } },
      { path: 'history', component: HistoricalDataComponent, data: { name: 'Historical data', forRole: ['consultant', 'manager', 'administrator'] } },
      { path: 'reports', component: ReportsComponent, data: { name: 'Reports', forRole: ['manager', 'administrator'] } },
      { path: 'projects', component: ProjectManagmentComponent, data: { name: 'Project management', forRole: ['manager', 'administrator'] } },
      { path: 'approval', component: TimeApprovalComponent, data: { name: 'Time approval', forRole: ['manager'] } },
      { path: 'users', component: UserManagementComponent, data: { name: 'User management', forRole: ['administrator']} }

    ] },
   ];

  accessedRoutes: Routes;

  constructor() {
    this.filterRoutes(this.role);
  }
  filterRoutes(roles) {
    const routes = this.routes[0].children.filter(item => this.setRoutesForRole(item.data.forRole, roles));
    const routesWithRedirect = this.addRedirectPage(routes, roles);

    this.accessedRoutes = routesWithRedirect;
  }

  addRedirectPage(routes: Routes, roles): Routes {
    let path: string;
    if (roles.includes('manager')) {
      path = '/approval';
    } else if (roles.includes('administrator')) {
      path = '/reports';
    } else {
      path = '/track';
    }
    const redirectPage: Route = {path: '**', redirectTo: path};

    return [...routes, redirectPage];
  }

  setRoutesForRole(arr1, arr2): boolean {
    return arr1.some(r => arr2.includes(r));
  }

  getAccessedRoutes(): Routes {
    return this.accessedRoutes;
  }

  getLinks(): Routes {
    return this.accessedRoutes.slice(0, -1);
  }

}
