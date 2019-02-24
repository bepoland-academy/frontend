import { Injectable } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';

import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { TimeApprovalComponent } from './time-approval.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { UserManagementComponent } from './user-management/user-management.component';

@Injectable()
export class RoleAuthService {
  role = ['consultant', 'administrator'];
  routes: Routes = [


    { path: 'track', component: TimeTrackingComponent, data: { name: 'Time tracking', forRole: ['consultant', 'manager', 'administrator'] } },
    { path: 'history', component: HistoricalDataComponent, data: { name: 'Historical data', forRole: ['consultant', 'manager', 'administrator'] } },
    { path: 'reports', component: ReportsComponent, data: { name: 'Reports', forRole: ['manager', 'administrator'] } },
    { path: 'projects', component: ProjectManagmentComponent, data: { name: 'Project management', forRole: ['manager', 'administrator'] } },
    { path: 'approval', component: TimeApprovalComponent, data: { name: 'Time approval', forRole: ['manager'] } },
    { path: 'users', component: UserManagementComponent, data: { name: 'User management', forRole: ['administrator'] } }

  ];

  links: Routes;

  constructor(private router: Router) {
    //this.filterRoutes(this.role);
  }
  filterRoutes(roles) {
    const routes = this.routes.filter(item => this.setRoutesForRole(item.data.forRole, roles));
    const redirectPage = this.addRedirectPage(roles);

    // setting links for allowed routes
    this.links = routes;

    // getting index of dashboard in routerConfig and adding children depends on current role
    const routerConfig = this.router.config;
    const dashboardIndex = routerConfig.findIndex(el => el.path === '');
    routerConfig[dashboardIndex].children = [...routes, redirectPage];
    this.router.resetConfig(routerConfig);
    this.router.navigate([redirectPage.redirectTo]);
    console.log(this.router)
  }

  addRedirectPage(roles): Route {
    let pathToRedirect: string;
    if (roles.includes('manager')) {
      pathToRedirect = '/approval';
    } else if (roles.includes('administrator')) {
      pathToRedirect = '/reports';
    } else {
      pathToRedirect = '/track';
    }
    return { path: '**', redirectTo: pathToRedirect };
  }

  setRoutesForRole(arr1, arr2): boolean {
    return arr1.some(r => arr2.includes(r));
  }

  getLinks(): Routes {
    return this.links;
  }

}
