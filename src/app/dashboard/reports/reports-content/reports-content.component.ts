import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-content',
  templateUrl: './reports-content.component.html',
  styleUrls: ['./reports-content.component.css'],
})
export class ReportsContentComponent implements OnInit {
  @Input() weeksInMonth;
  @Input() usersTimesheet;
  constructor() { }

  ngOnInit() {
  }

  setNumberOfColumns() {
    return `repeat(2, 1.8fr) repeat(${5 + this.weeksInMonth.length}, 1fr)`;
  }
}
