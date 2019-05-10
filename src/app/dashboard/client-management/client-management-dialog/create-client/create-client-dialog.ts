import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { Client } from '../../../../core/models';
import { HttpService } from 'src/app/core/services/http.service';


@Component({
  selector: 'app-create-client-dialog',
  templateUrl: './create-client-dialog.html',
  styles: [`
  .mat-card-header {justify-content: center;}
  .createClient {display: flex; justify-content: space-around;}
  .mat-form-field {width: 250px;}
  ::ng-deep .mat-form-field-wrapper {padding: 0; margin: 0;}
  `],
})

export class CreateClientDialogComponent implements OnInit {

  @ViewChild('clientForm') createClientForm: NgForm;


  constructor(
    public dialogRef: MatDialogRef<CreateClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Client,
    private snackBar: MatSnackBar,
    private httpService: HttpService
  ) {
    }

  ngOnInit() {
  }

  cancelCreate(): void {
    this.dialogRef.close();
  }

  createClient(): void {
    const client = this.createClientForm.value;
    const clients = this.httpService.clientsStream.getValue();
    const isNameInClientsStream = clients.some(el => el.name.replace(/\s+/g, '') === client.name.replace(/\s+/g, ''));
    if (isNameInClientsStream) {
      this.snackBar.open('Client with current already exist, please change name', 'X', { duration: 5000 });
      return;
    }
    this.httpService.post('clients', client).subscribe(
      () => {
        this.httpService.getProjectsAndClients();
        this.snackBar.open(`New client ${client.name} created`, '', {
          duration: 2000,
        });
        this.createClientForm.resetForm();
      },
      (error) => {
        this.snackBar.open(`Ups! New client ${client.name} has not been created`, '', {
          duration: 2000,
        });
      }
    );
    this.dialogRef.close();
  }


}

