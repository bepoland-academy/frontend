import { RouterModule, Routes } from '@angular/router';
import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { TimeApprovalComponent } from './time-approval.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { UserManagmentComponent } from './user-managment.component';

const routes: Routes = [
  { path: 'track', component: TimeTrackingComponent },
  { component: HistoricalDataComponent, path: 'history' },
  { component: ReportsComponent, path: 'reports' },
  { component: TimeApprovalComponent, path: 'approval' },
  { component: ProjectManagmentComponent, path: 'projects' },
  { component: UserManagmentComponent, path: 'users' }
];



export const rootModule = RouterModule.forRoot(routes, {

  // useHash: true, enableTracing: true,
});
