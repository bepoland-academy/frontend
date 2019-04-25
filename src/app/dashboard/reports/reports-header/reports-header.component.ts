import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { MatDatepicker } from '@angular/material';

import { Department, ProjectsByClient, Project } from 'src/app/core/models';

@Component({
  selector: 'app-reports-header',
  templateUrl: './reports-header.component.html',
  styleUrls: ['./reports-header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsHeaderComponent {
  @Input() departments: Array<Department>;
  @Output() setDepartment: EventEmitter<Department> = new EventEmitter();
  @Input() clients: Array<ProjectsByClient>;
  @Output() setClient: EventEmitter<ProjectsByClient> = new EventEmitter();
  @Input() currentDate: string;
  @Output() setCurrentDate: EventEmitter<Date> = new EventEmitter();


  constructor() { }
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

