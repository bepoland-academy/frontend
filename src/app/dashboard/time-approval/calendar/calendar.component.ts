import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  @Input() toggleButtonVisible: boolean;
  @Output() listClick = new EventEmitter<null>();

  constructor() { }

  ngOnInit() {
  }

  askToShow() {
    this.listClick.emit();
  }
}
