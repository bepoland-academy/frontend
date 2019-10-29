import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

import { Client } from '../../../../core/models';
import { HttpService } from 'src/app/core/services/http.service';
import { GlobalDataService } from 'src/app/core/services/global-data.service';


@Component({
  selector: 'app-edit-client-dialog',
  templateUrl: './edit-client-dialog.html',
  styles: [`
  .mat-card {padding-right: 0;}
  .mat-card-header {justify-content: center;}
  .input {display: flex; justify-content: space-around; align-items: center;}
  .editClient {width: 250px; display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class EditClientDialogComponent implements OnInit {
  client: string;

  @ViewChild('updateForm') updateClientForm: NgForm;

  constructor(
    public dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private snackBar: MatSnackBar,
    private httpService: HttpService,
    private globalData: GlobalDataService
  ) {
    }

  ngOnInit() {
    this.client = this.data.name;
  }

  cancelEdit(): void {
    this.dialogRef.close();
  }

  editClient(): void {
    const clients = this.globalData.getClientsValue;
    const {...client} = this.data;
    client.name = this.updateClientForm.value.name;
    const isNameInClientsStream = clients.some(el => el.name.replace(/\s+/g, '') === client.name.replace(/\s+/g, ''));
    if (isNameInClientsStream) {
      this.snackBar.open('Client with current already exist, please change name', 'X', {duration: 5000});
      return;
    }
    console.log('tutajs');
    this.httpService.put(client._links.self.href, client)
      .subscribe(
        () => {
          this.globalData.getGlobalData();
        },
        (err) => {
          this.snackBar.open(`Ups! Changes for client ${client.name} have not been saved`, '', {
            duration: 2000,
          });
        }
      );
    this.dialogRef.close();
  }

deleteClient(): void {
  const {...client} = this.data;
  this.httpService.delete(client._links.DELETE.href)
    .subscribe(
      () => {
        this.globalData.getGlobalData();
        this.snackBar.open(`Client ${client.name} was deleted`, '', {
          duration: 2000,
        });
      },
      (err) => {
        this.snackBar.open(`Client ${client.name} cannot be deleted`, '', {
          duration: 2000,
        });
      }
    );

  this.dialogRef.close();
}
}

