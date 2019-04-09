import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ChangeDetectorRef, ViewChildren } from '@angular/core';

import { TimeEntry, Day } from '../../../core/models';
import { MatTooltip, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-time-entry-footer',
  templateUrl: './time-entry-footer.component.html',
  styleUrls: ['./time-entry-footer.component.css'],
})
export class TimeEntryFooterComponent implements OnInit {
  @Input() timeEntries: Array<TimeEntry>;
  @Output() saveCurrentEntries: EventEmitter<null> = new EventEmitter();
  @Output() submitCurrentEntries: EventEmitter<null> = new EventEmitter();
  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  saveCurrentEntriesHandler() {
    this.saveCurrentEntries.emit();
  }

  submitCurrentEntriesHandler() {
    this.submitCurrentEntries.emit();
  }
}
