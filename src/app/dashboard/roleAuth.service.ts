import { Injectable, NgZone } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { TimeApprovalComponent } from './time-approval.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { UserManagementComponent } from './user-management/user-management.component';

@Injectable()
export class RoleAuthService {
  routes: Routes = [
    { path: 'track', component: TimeTrackingComponent, data: { name: 'Time tracking', forRole: ['CONSULTANT', 'MANAGER', 'ADMINISTRATION'] } },
    { path: 'history', component: HistoricalDataComponent, data: { name: 'Historical data', forRole: ['CONSULTANT', 'MANAGER', 'ADMINISTRATION'] } },
    { path: 'reports', component: ReportsComponent, data: { name: 'Reports', forRole: ['MANAGER', 'ADMINISTRATION'] } },
    { path: 'projects', component: ProjectManagmentComponent, data: { name: 'Project management', forRole: ['MANAGER', 'ADMINISTRATION'] } },
    { path: 'approval', component: TimeApprovalComponent, data: { name: 'Time approval', forRole: ['MANAGER'] } },
    { path: 'users', component: UserManagementComponent, data: { name: 'User management', forRole: ['ADMINISTRATION'] } }
  ];

  links: BehaviorSubject<Routes> = new BehaviorSubject([]);

  constructor(private router: Router, private ngZone: NgZone) {}
  filterRoutes(roles) {
    const routes = this.routes.filter(item => this.setRoutesForRole(item.data.forRole, roles));
    const redirectPage = this.addRedirectPage(roles);

    // setting links for allowed routes
    this.links.next(routes);

    // getting index of dashboard in routerConfig and adding children depends on current role
    const routerConfig = this.router.config;
    const dashboardIndex = routerConfig.findIndex(el => el.path === '');
    routerConfig[dashboardIndex].children = [...routes, redirectPage];
    this.ngZone.run(() => {
      this.router.resetConfig(routerConfig);
      this.router.navigate([redirectPage.redirectTo]);
    });

  }

  addRedirectPage(roles): Route {
    let pathToRedirect: string;
    if (roles.includes('MANAGER')) {
      pathToRedirect = '/approval';
    } else if (roles.includes('ADMINISTRATION')) {
      pathToRedirect = '/reports';
    } else {
      pathToRedirect = '/track';
    }
    return { path: '**', redirectTo: pathToRedirect };
  }

  setRoutesForRole(arr1, arr2): boolean {
    return arr1.some(r => arr2.includes(r));
  }

  getLinks(): BehaviorSubject<Routes> {
    return this.links;
  }

}
