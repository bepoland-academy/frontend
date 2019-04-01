import { Component, OnInit } from '@angular/core';
import { ClientManagementService } from './client-management.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateClientDialog } from './client-management-dialog/create-client-dialog';
import { EditClientDialog } from './client-management-dialog/edit-client-dialog';


@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css'],
})

export class ClientManagementComponent implements OnInit {
  clients: Array<any> = [];

  constructor(
    private clientManagementService: ClientManagementService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.clientManagementService.getClients().subscribe((data) => {
      this.clients = data;
    });
  }

  createClient(model): void {
    console.log('create client');
    const dialogRef = this.dialog.open(CreateClientDialog, {
      data: {
        // date: model.event.extendedProps.projects[0].day.date,
        // projects: model.event.extendedProps.projects,
      },
    });
  }

  editClient(model): void {
    console.log('edit client');
    const dialogRef = this.dialog.open(EditClientDialog, {
      data: {
        // date: model.event.extendedProps.projects[0].day.date,
        // projects: model.event.extendedProps.projects,
      },
    });
  }
}
