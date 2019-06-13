import { Injectable, NgZone } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { TimeEntryComponent } from '../../dashboard/time-entry/time-entry.component';
import { HistoricalDataComponent } from '../../dashboard/historical-data/historical-data.component';
import { ReportsComponent } from '../../dashboard/reports/reports.component';
import { TimeApprovalComponent } from '../../dashboard/time-approval/time-approval.component';
import { ProjectManagementComponent } from '../../dashboard/project-management/project-management.component';
import { UserManagementComponent } from '../../dashboard/user-management/user-management.component';
import { NoRoleComponent } from '../../dashboard/no-role.component';
import { ClientManagementComponent } from 'src/app/dashboard/client-management/client-management.component';
import { RoleManagementComponent } from 'src/app/dashboard/role-management/role-management.component';

@Injectable()
export class NavigationService {
  routes: Routes = [
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
      data: { name: 'User management',
      forRole: ['ADMINISTRATION'] },
    },
    {
      path: 'clients',
      component: ClientManagementComponent,
      data: { name: 'Client management',
      forRole: ['ADMINISTRATION'] },
    },
    {
      path: 'roles',
      component: RoleManagementComponent,
      data: { name: 'Role management',
      forRole: ['ADMINISTRATION'] },
    },
  ];

  links: BehaviorSubject<Routes> = new BehaviorSubject([]);

  constructor(private router: Router, private ngZone: NgZone) {}
  filterRoutes(roles: Array<string>): void {
    if (!roles.length) {
      return this.noRolesProvided();
    }
    const routes: Routes = this.routes.filter(item => this.setRoutesForRole(item.data.forRole, roles));
    const redirectPage: Route = this.addRedirectPage(roles);

    // setting links for allowed routes
    this.links.next(routes);

    // getting index of dashboard in routerConfig and adding children depends on current role
    const routerConfig: Router['config'] = this.router.config;
    const dashboardIndex: number = routerConfig.findIndex(el => el.path === '');
    routerConfig[dashboardIndex].children = [...routes, redirectPage];
    this.ngZone.run(() => {
      this.router.resetConfig(routerConfig);
      this.router.navigate([redirectPage.redirectTo]);
    });
  }

  noRolesProvided(): void {
    const routes: Routes = [
      {path: '', component: NoRoleComponent, data: { }},
    ];
    this.links.next(routes);
    const redirectPage: Route = {path: '**', redirectTo: ''};
    const routerConfig: Router['config'] = this.router.config;
    const dashboardIndex: number = routerConfig.findIndex(el => el.path === '');
    routerConfig[dashboardIndex].children = [...routes, redirectPage];
    this.ngZone.run(() => {
      this.router.resetConfig(routerConfig);
      this.router.navigate(['']);

    });

  }

  addRedirectPage(roles: Array<string>): Route {
    let pathToRedirect: string;
    if (roles.includes('MANAGER')) {
      pathToRedirect = '/approval';
    } else if (roles.includes('ADMINISTRATION')) {
      pathToRedirect = '/reports';
    } else {
      pathToRedirect = '/track';
    }
    return { path: '**', redirectTo: '/projects', pathMatch: 'full' };
  }

  setRoutesForRole(arr1: Array<string>, arr2: Array<string>): boolean {
    return arr1.some(r => arr2.includes(r));
  }

  getLinks(): BehaviorSubject<Routes> {
    return this.links;
  }

}
