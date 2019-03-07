import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-role',
  template: `
    <h1>You do not have a role assigned, please contact the system administrator</h1>
  `,
  styles: [''],
})
export class NoRoleComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
