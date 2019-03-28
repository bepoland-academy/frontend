import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-time-approval-dialog',
  templateUrl: './time-approval-dialog.html',
  styleUrls: ['./time-approval-dialog.css'],
  // styles: [`
  // .mat-card-header, .mat-dialog-actions {justify-content: space-around;}
  // .mat-card {text-align: center;}
  // `],
})

export class TimeApprovalDialog implements OnInit {

  @ViewChild('updateForm') updateProjectForm: NgForm;

  actualDepartment = '';

  constructor(
    public dialogRef: MatDialogRef<TimeApprovalDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    }

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  decideOnHours() {
    this.dialogRef.close();
  }
}

