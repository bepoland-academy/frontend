import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TimeApprovalService } from '../../time-approval.service';


@Component({
  selector: 'app-time-approval-dialog',
  templateUrl: './time-approval-dialog.html',
  styleUrls: ['./time-approval-dialog.css'],
})

export class TimeApprovalDialog implements OnInit {

  comments = false;
  comment: string;

  constructor(
    public dialogRef: MatDialogRef<TimeApprovalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private timeApprovalService: TimeApprovalService
  ) {
    }

  ngOnInit() {
  }

  onReject(): void {
    this.comments = true;

  }

  finalReject() {
    console.log(this.data.currentUser);
    const dataToSend = this.data.currentUser.monthTimeSheet.map(timeSheet => {
      const { projectInfo, ...rest } = timeSheet;
      return {
        ...rest,
        monthDays: rest.monthDays.map(item => item.date === this.data.date ? { ...item, status: 'REJECTED', comment: this.comment } : item),
      };
    });
    const userWithModifiedTimeSheet = {
      ...this.data.currentUser,
      monthTimeSheet: this.data.currentUser.monthTimeSheet.map(timeSheet => ({ ...timeSheet, monthDays: timeSheet.monthDays.map(item => item.date === this.data.date ? { ...item, status: 'REJECTED', comment: this.comment } : item)})),
    };
    console.log(userWithModifiedTimeSheet);

    this.timeApprovalService.reloadCalendar(userWithModifiedTimeSheet);
    this.timeApprovalService.updateTimeSheet(this.data.currentUser._links.self.href, { monthTimeEntryBodyList: dataToSend}).subscribe(() => console.log('oposzlo'));
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

