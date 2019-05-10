import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateClientDialogComponent } from './client-management-dialog/create-client/create-client-dialog';
import { EditClientDialogComponent } from './client-management-dialog/edit-client/edit-client-dialog';
import { Client, ClientsResponse } from '../../core/models';
import { HttpService } from 'src/app/core/services/http.service';


@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css'],
})

export class ClientManagementComponent implements OnInit {
  clients: Array<Client> = [];
  error: boolean;
  constructor(
    public dialog: MatDialog,
    private httpService: HttpService
    ) { }

  ngOnInit() {
    this.httpService.getClientsStream().subscribe(
      (clients: Array<Client>) => {
        this.clients = clients;
        this.error = false;
      },
      () => this.error = true
    );
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateClientDialogComponent, {
    });
  }

  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: client,
    });
  }

}
