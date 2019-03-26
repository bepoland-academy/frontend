import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Day } from '../../../core/models';

@Component({
  selector: 'app-time-entry-naviagtion',
  templateUrl: './time-entry-naviagtion.component.html',
  styleUrls: ['./time-entry-naviagtion.component.css'],
})
export class TimeEntryNaviagtionComponent implements OnInit {
  @Input() week: Array<Day> = [];
  @Input() dateCalendar: Date;
  @Output() openDrawer: EventEmitter<null> = new EventEmitter();
  @Output() setNextWeek: EventEmitter<null> = new EventEmitter();
  @Output() setPreviousWeek: EventEmitter<null> = new EventEmitter();
  @Output() setWeekFromCalendar: EventEmitter<null> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  openDrawerHandler() {
    this.openDrawer.emit();
  }

  setNextWeekHandler() {
    this.setNextWeek.emit();
  }
  setPreviousWeekHandler() {
    this.setPreviousWeek.emit();
  }

  setWeekFromCalendarHandler(event) {
    this.setWeekFromCalendar.emit(event.value);
  }
}
