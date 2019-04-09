import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-time-entry-content-dialog',
  template: `
    <h2 mat-dialog-title>Are you sure you want to delete </h2>
    <h2>{{data.name}} </h2>
      <div class="center" mat-dialog-actions>
        <button mat-stroked-button [mat-dialog-close]="false" cdkFocusInitial>No</button>
        <button mat-stroked-button [mat-dialog-close]="true">Yes</button>
      </div>
  `,
  styles: ['.center {display: flex; justify-content: space-around}'],
})
export class DialogDeleteComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DialogDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void { }
}
