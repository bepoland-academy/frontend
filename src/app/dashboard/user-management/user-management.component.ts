import { Component, OnInit } from '@angular/core';

import { UserManagementService } from './user-management.service';
import { DepartmentsResponse, Department } from 'src/app/core/models';

@Component({
  selector: 'app-user-management',
  template: `
     <div *ngIf="!error && departments.length" fxLayout="row" fxLayoutAlign="space-around" class="user-management">
       <app-users-report [departments]="departments"></app-users-report>
       <app-user-registration [departments]="departments"></app-user-registration>
     </div>
     <app-error *ngIf="error"></app-error>
   `,
  styles: ['.user-management {padding: 20px 0 0}'],
 })

 export class UserManagementComponent implements OnInit {
  departments: Array<Department> = [];
  error: boolean;
  constructor(
    private userManagementService: UserManagementService
  ) {}

  ngOnInit() {
    this.userManagementService.getDepartments().subscribe(
      (response: DepartmentsResponse) => {
        this.departments = response._embedded.departmentBodyList;
        this.error = false;
      },
      () => {
        this.error = true;
      }
    );
  }
 }
