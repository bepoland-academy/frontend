import { Component, OnInit, Input } from '@angular/core';
import { Day } from '../../../core/models';

@Component({
  selector: 'app-time-entry-heading',
  templateUrl: './time-entry-heading.component.html',
  styleUrls: ['./time-entry-heading.component.css'],
})
export class TimeEntryHeadingComponent implements OnInit {
  @Input() week: Array<Day>;
  constructor() { }

  ngOnInit() {
  }

}
