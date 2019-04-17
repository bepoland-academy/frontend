import { Component, OnInit, Input } from '@angular/core';
import {  } from 'module';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { CalendarDialogComponent } from './calendar-dialog';

@Component({
  selector: 'app-calendar-dialog-historical-data',
  template: `
    <div mat-dialog-actions>
      <button mat-stroked-button (click)="closeDialog()">Cancel</button>
      <button mat-stroked-button (click)="editWeek()">Edit week</button>
    </div>
  `,
  styles: [],
})
export class CalendarDialogHistoricalDataComponent implements OnInit {
  @Input() date: string;
  constructor(
    private router: Router,
    private dialog: CalendarDialogComponent
  ) { }

  ngOnInit() {
  }

  editWeek() {
    const week = moment(this.date, 'YYYY-MM-DD').week();
    const year = moment(this.date, 'YYYY-MM-DD').year();
    this.router.navigate(['/track'], { queryParams: { week: `${year}-W${week}` } });
    this.closeDialog();
  }

  closeDialog() {
    this.dialog.dialogRef.close();
  }
}
