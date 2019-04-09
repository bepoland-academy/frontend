import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import * as moment from 'moment';


@Component({
  selector: 'app-time-approval-dialog',
  templateUrl: './time-approval-dialog.html',
  styleUrls: ['./time-approval-dialog.css'],
})

export class TimeApprovalDialog implements OnInit {

  comments = false;
  comment: string;
  sumOfHours = 0;

  constructor(
    public dialogRef: MatDialogRef<TimeApprovalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.comment = this.data.projects[0].day.comment;
    this.sumOfHours = this.data.projects.map(project => project.day.hours).reduce((sum, nextValue) => sum + nextValue);
  }

  onReject(): void {
    this.comments = true;
  }

  editWeek() {
    const date = this.data.projects[0].day.date;
    const week = moment(date, 'YYYY-MM-DD').week();
    const year = moment(date, 'YYYY-MM-DD').year();
    this.router.navigate(['/track'], { queryParams: { week: `${year}-W${week}` } });
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
  cancelReject() {
    this.comments = false;
  }
}

