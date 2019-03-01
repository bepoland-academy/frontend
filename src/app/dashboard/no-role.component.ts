import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-role',
  template: `
    <h1>You have no role provided, contact administrator to provide for you a role</h1>
  `,
  styles: ['']
})
export class NoRoleComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}

