import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddEntryComponent } from './add-entry/add-entry.component';
import { TimeEntryService } from './time-entry.service';

@Component({
  selector: 'app-time-entry',
  templateUrl: './time-entry.component.html',
  styleUrls: ['./time-entry.component.css'],
})
export class TimeEntryComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private timeEntryService: TimeEntryService
  ) { }

  displayedColumns = [
    'client',
    'project',
  ];

  dataSource = [{clientName: 'aaaa', projects: [{name: 'asdwegweg'}]}];



 ELEMENT_DATA = [
  { client: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { client: 1, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { client: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { client: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { client: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { client: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { client: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { client: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { client: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { client: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

  addNew(entry) {
    const dialogRef = this.dialog.open(AddEntryComponent, {
      data: { entry } });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        // this.exampleDatabase.dataChange.value.push(this.dataService.getDialogData());
        // this.refreshTable();
      }
    });
  }

  ngOnInit() {
    this.timeEntryService.getTracks().subscribe(el => {
      this.dataSource = el.entries;
      console.log(el.entries);
    });
  }



}
