import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';

import { TimeEntry, Day } from '../../../core/models';
import { MatDialog  } from '@angular/material';
import { DialogDeleteComponent } from './dialog/time-entry-content-dialog';

// DIALOG COMPONENT


// TimeEntryContentComponent
@Component({
  selector: 'app-time-entry-content',
  templateUrl: './time-entry-content.component.html',
  styleUrls: ['./time-entry-content.component.css'],
})
export class TimeEntryContentComponent implements OnInit {
  @Input() timeEntries: TimeEntry;
  @Output() removeProject: EventEmitter<TimeEntry> = new EventEmitter();
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  sumAllHoursFromWeek(week: TimeEntry): number {
    return week.weekDays
      .map((day: Day) => +day.hours)
      .reduce((sum: number, nextValue: number) => sum + nextValue);
  }
  removeProjectHandler(timeEntry: TimeEntry) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: '400px',
      data: {
        name: timeEntry.projectInfo.name,
      },
    });
    dialogRef.afterClosed().subscribe((val: boolean) => {
      if (val) {
        this.removeProject.emit(timeEntry);
      }
    });
  }

  check(client, i) {
    return client.projects.length > 1 && (client.projects.length - 1 !== i);
  }
}
