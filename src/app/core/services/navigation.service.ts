import { Injectable, NgZone } from '@angular/core';
import { Routes, Route, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

import { mainRoutes } from '../constans/routes';
import { NoRoleComponent } from '../../dashboard/no-role.component';

@Injectable()
export class NavigationService {

  links: BehaviorSubject<Routes> = new BehaviorSubject([]);

  constructor(private router: Router, private ngZone: NgZone) {}
  filterRoutes(roles: Array<string>): void {
    if (!roles.length) {
      return this.noRolesProvided();
    }
    const routes: Routes = mainRoutes.filter(item => this.setRoutesForRole(item.data.forRole, roles));
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
    return { path: '**', redirectTo: '/track', pathMatch: 'full' };
  }

  setRoutesForRole(arr1: Array<string>, arr2: Array<string>): boolean {
    return arr1.some(r => arr2.includes(r));
  }

  getLinks(): BehaviorSubject<Routes> {
    return this.links;
  }

}
