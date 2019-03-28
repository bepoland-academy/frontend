import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TimeApprovalService } from '../time-approval.service';
import { MatDialog } from '@angular/material';
import { TimeApprovalDialog } from './time-approval-dialog/time-approval-dialog';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent implements OnInit {

  @Input() toggleButtonVisible: boolean;
  @Input() currentUser: string;
  @Output() listClick = new EventEmitter<null>();

  constructor(
    private timeApprovalService: TimeApprovalService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.openDialog();
  }

  askToShow() {
    this.listClick.emit();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TimeApprovalDialog, {
      width: '250px',
      height: '250px',
      data: {},
    });
  }

}
