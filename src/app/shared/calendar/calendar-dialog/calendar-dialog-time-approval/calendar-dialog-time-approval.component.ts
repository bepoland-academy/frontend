import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { CalendarDialogComponent } from '../calendar-dialog';

@Component({
  selector: 'app-calendar-dialog-time-approval',
  templateUrl: './calendar-dialog-time-approval.component.html',
  styleUrls: ['./calendar-dialog-time-approval.component.css'],
})
export class CalendarDialogTimeApprovalComponent implements OnInit {
  @Input() isActionAllowed: boolean;
  comment = '';
  isRejecting = false;
  constructor(
    private snackBar: MatSnackBar,
    private dialog: CalendarDialogComponent
    ) { }

  ngOnInit() {
  }

  commentChange(comment: string) {
    if (comment.length > 499) {
      this.snackBar.open('Comment can have only 500 characters', 'X', {duration: 3000, horizontalPosition: 'left'});
    }
  }

  onReject(): void {
    this.isRejecting = true;
  }

  cancelReject() {
    this.isRejecting = false;
  }

  sendReject() {
    if (!this.comment.trim().length) {
      this.snackBar.open('You can not reject if there is no comment', 'X', {
        duration: 3000,
        horizontalPosition: 'left',
      });
      return;
    }
    console.log(this.comment);
    this.dialog.dialogRef.close({comment: this.comment});
  }
}
