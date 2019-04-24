import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reports-content-header',
  templateUrl: './reports-content-header.component.html',
  styleUrls: ['./reports-content-header.component.css'],
})
export class ReportsContentHeaderComponent implements OnInit {
  @Input() weeksInMonth;
  @Input() numberOfColumns;
  constructor() { }

  ngOnInit() {
  }


}
