import { Component, Input, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Week, ConsultantWithTimesheet } from '../../models';

@Component({
  selector: 'app-reports-content-header',
  templateUrl: './reports-content-header.component.html',
  styleUrls: ['./reports-content-header.component.css'],
})
export class ReportsContentHeaderComponent {
  @Input() weeksInMonth: Array<Week>;
  @Input() numberOfColumns: Array<ConsultantWithTimesheet>;

  employeeInput: string;
  @Output() projectInputChanges = new EventEmitter();
  @Output() employeeInputChanges = new EventEmitter();
  projectInput: string;

  constructor() { }

  employeeInputChangesHandler(val: string) {
    this.employeeInputChanges.emit(val.trim());
  }
  projectInputChangesHandler(val: string) {
    this.projectInputChanges.emit(val.trim());
  }
}
