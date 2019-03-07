import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-management',
  template: `
     <div fxLayout="row" fxLayoutAlign="space-around" class="user-management">
       <app-users-report></app-users-report>
       <app-user-registration></app-user-registration>
     </div>
   `,
  styles: ['.user-management {padding: 30px 0 0}'],
 })

 export class UserManagementComponent implements OnInit {

  constructor() {}

  ngOnInit() {}
 }
