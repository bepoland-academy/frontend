import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges } from '@angular/core';

import { Week, ConsultantWithTimesheet } from '../models';

@Component({
  selector: 'app-reports-content',
  templateUrl: './reports-content.component.html',
  styleUrls: ['./reports-content.component.css'],
})
export class ReportsContentComponent implements OnInit, OnChanges {
  @Input() weeksInMonth: Array<Week>;
  @Input() usersTimesheet: Array<ConsultantWithTimesheet>;
  usersTimesheetToFilter: Array<ConsultantWithTimesheet>;
  employeeInput: string;
  projectInput: string;
  constructor() { }

  ngOnInit() {
    this.usersTimesheetToFilter = [...this.usersTimesheet];
  }

  ngOnChanges(): void {
    this.usersTimesheetToFilter = [...this.usersTimesheet];
  }

  employeeInputChanges(e: string) {
    this.employeeInput = e;
    if (this.employeeInput.length) {
      this.filterProjectsAndUsers();
    }
    this.usersTimesheetToFilter = this.usersTimesheet.filter(el => el.firstName.includes(e) || el.lastName.includes(e));
    console.log(this.employeeInput);

  }
  projectInputChanges(e: string) {
    this.projectInput = e;
    if (this.employeeInput.length) {
      this.filterProjectsAndUsers();
    }
    this.usersTimesheetToFilter = this.usersTimesheet.filter(el => el.projectName.includes(e));
  }

  filterProjectsAndUsers() {
    this.usersTimesheetToFilter = this.usersTimesheet.filter(el =>
      el.projectName.includes(this.projectInput) && el.firstName.includes(this.employeeInput) ||
      el.projectName.includes(this.projectInput) && el.lastName.includes(this.employeeInput)
    );
  }

  setNumberOfColumns(): string {
    return `repeat(2, 1.8fr) repeat(${5 + this.weeksInMonth.length}, 1fr)`;
  }
}
