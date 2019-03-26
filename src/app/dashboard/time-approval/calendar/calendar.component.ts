import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeApprovalService } from '../time-approval.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  @Input() toggleButtonVisible: boolean;
  @Output() listClick = new EventEmitter<null>();

  constructor(
    private timeApprovalService: TimeApprovalService
  ) { }

  ngOnInit() {
  }

  askToShow() {
    this.listClick.emit();
  }
}
