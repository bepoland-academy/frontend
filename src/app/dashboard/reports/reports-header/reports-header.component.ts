import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges } from '@angular/core';
import { MatDatepicker } from '@angular/material';

import { Department, ProjectsByClient } from 'src/app/core/models';
import * as moment from 'moment';
@Component({
  selector: 'app-reports-header',
  templateUrl: './reports-header.component.html',
  styleUrls: ['./reports-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsHeaderComponent implements OnChanges {
  @Input() departments: Array<Department>;
  @Output() setDepartment: EventEmitter<Department> = new EventEmitter();
  @Input() clients: Array<ProjectsByClient>;
  @Output() setClient: EventEmitter<ProjectsByClient> = new EventEmitter();
  @Input() currentDate: string;
  @Output() setCurrentDate: EventEmitter<Date> = new EventEmitter();
  actualDate: Date;

  constructor() { }

  ngOnChanges(): void {
    this.actualDate = moment(this.currentDate, 'YYYY-MM').toDate();
  }

  setDepartmentHandle(department: Department) {
    this.setDepartment.emit(department);
  }

  setClientHandler(client: ProjectsByClient) {
    this.setClient.emit(client);
  }

  setCurrentDateHandler(date: Date, dp: MatDatepicker<any>) {
    this.setCurrentDate.emit(date);
    dp.close();
  }
}

