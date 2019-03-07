import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
];

export const rootModule = RouterModule.forChild(routes);
