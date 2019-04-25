import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';

import * as moment from 'moment';


@Component({
  selector: 'app-calendar-dialog',
  templateUrl: './calendar-dialog.html',
  styleUrls: ['./calendar-dialog.css'],
})

export class CalendarDialogComponent implements OnInit {

  isRejecting = false;
  comment: string;
  sumOfHours = 0;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.comment = this.data.projects[0].day.comment;
    this.sumOfHours = this.data.projects.map(project => project.day.hours).reduce((sum, nextValue) => sum + nextValue);
  }
}

