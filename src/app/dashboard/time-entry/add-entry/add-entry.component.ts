

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Component, Inject } from '@angular/core';
// import { DataService } from '../../services/data.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-entry',
  templateUrl: './add-entry.component.html',
  styleUrls: ['./add-entry.component.css'],
})
export class AddEntryComponent {

  constructor(
    public dialogRef: MatDialogRef<AddEntryComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    // public dataService: DataService
  ) { }

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' :
      this.formControl.hasError('email') ? 'Not a valid email' :
        '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // public confirmAdd(): void {
  //   this.dataService.addIssue(this.data);
  // }
}
