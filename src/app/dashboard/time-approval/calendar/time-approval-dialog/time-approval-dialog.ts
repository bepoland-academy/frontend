import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-time-approval-dialog',
  templateUrl: './time-approval-dialog.html',
  styleUrls: ['./time-approval-dialog.css'],
})

export class TimeApprovalDialog implements OnInit {

  comments = false;

  constructor(
    public dialogRef: MatDialogRef<TimeApprovalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    }

  ngOnInit() {}

  onReject(): void {
    this.comments = true;
  }

  finalReject() {
    this.comments = false;
    this.dialogRef.close();
  }

  cancelReject() {
    this.comments = false;
  }

  decideOnHours() {
    this.dialogRef.close();
  }
}

