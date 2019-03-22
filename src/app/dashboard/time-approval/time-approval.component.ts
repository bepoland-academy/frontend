import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-time-approval',
  templateUrl: './time-approval.component.html',
  styleUrls: ['./time-approval.component.css'],
  })

export class TimeApprovalComponent implements OnInit {

  sidenavOpen = true;
  toggleButtonVisible = false;

  constructor() { }

  ngOnInit() {
  }

  hideSidenav() {
    console.log('works');
    this.sidenavOpen = false;
    this.toggleButtonVisible = true;
  }

  showSidenav() {
    this.sidenavOpen = true;
    this.toggleButtonVisible = false;
  }

}
