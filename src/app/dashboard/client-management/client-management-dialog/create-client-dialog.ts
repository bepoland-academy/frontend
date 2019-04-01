import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ClientManagementService } from '../client-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Client } from '../../../core/models';


// export interface DialogData {
//   client: string;
//   name: string;
//   rate: string;
//   comments: string;
//   active: string;
//   departments: Array<any>;
//   department: string;
//   _links: any;
// }


@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.html',
  styles: [`
  .mat-card-header {justify-content: center;}
  .editClient {display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class CreateClientDialog implements OnInit {

  @ViewChild('updateForm') updateProjectForm: NgForm;


  constructor(
    public dialogRef: MatDialogRef<CreateClientDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientManagementService: ClientManagementService
  ) {
    }

  ngOnInit() {
  }

  cancelCreate(): void {
    this.dialogRef.close();
  }


  createClient() {
    console.log('create client');
    this.dialogRef.close();
    // this.updateProjectForm.value.client = this.data.client;
    // this.projectManagementService.updateProject(this.data._links.self.href, this.updateProjectForm.value)
    //   .subscribe(() => {
    //     this.projectManagementService.changeReloadStatus();
    //   },
    //   (err) => {
    //   });
  }
}

