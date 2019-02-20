import { RouterModule, Routes } from '@angular/router';

import {RoleAuthService} from './roleAuth.service';

const roleAuthService: RoleAuthService = new RoleAuthService();

const routes: Routes = roleAuthService.getAccessedRoutes();



export const rootModule = RouterModule.forRoot(routes, {

  // useHash: true, enableTracing: true,
});
