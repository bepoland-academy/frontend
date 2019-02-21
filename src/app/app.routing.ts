import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
  {path: '**', redirectTo: 'login'}
];



export const rootModule = RouterModule.forRoot(routes, {

  // useHash: true, enableTracing: true,
});
