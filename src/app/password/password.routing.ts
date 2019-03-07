import { RouterModule, Routes } from '@angular/router';
import { PasswordComponent } from './password.component';

const routes: Routes = [
  { path: 'password', component: PasswordComponent },
];



export const rootModule = RouterModule.forChild(routes);
