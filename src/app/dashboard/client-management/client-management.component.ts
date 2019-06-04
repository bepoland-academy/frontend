import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { CreateClientDialogComponent } from './client-management-dialog/create-client/create-client-dialog';
import { EditClientDialogComponent } from './client-management-dialog/edit-client/edit-client-dialog';
import { Client, ClientsResponse } from '../../core/models';
import { HttpService } from 'src/app/core/services/http.service';
import { GlobalDataService } from 'src/app/core/services/global-data.service';


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
    private globalData: GlobalDataService
    ) { }

  ngOnInit() {
    this.clients = this.globalData.getClientsValue;
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
