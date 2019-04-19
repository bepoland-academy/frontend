import { Component, OnInit } from '@angular/core';
import { ClientManagementService } from './client-management.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialog } from './client-management-dialog/create-client/create-client-dialog';
import { EditClientDialog } from './client-management-dialog/edit-client/edit-client-dialog';
import { Client, ClientsResponse } from '../../core/models';
import { normalize } from 'path';

export enum ClientType {
  Normal,
  Super,
  SuperDuper,
}

@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css'],
})

export class ClientManagementComponent implements OnInit {
  clients: Array<Client> = [];

  type: ClientType = ClientType.Normal;

  constructor(
    private clientManagementService: ClientManagementService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.clientManagementService.getReloadStatus().subscribe(() => {
      this.clientManagementService.getClients().subscribe((data: ClientsResponse) => {
        this.clients = data._embedded.clientBodyList;
      });
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateClientDialog, {
    });
  }

  openEditDialog(client: Client): void {
    const dialogRef = this.dialog.open(EditClientDialog, {
      data: client,
    });
  }

}
