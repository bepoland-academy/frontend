import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Department, ProjectsByClient, Project } from 'src/app/core/models';

@Component({
  selector: 'app-reports-header',
  templateUrl: './reports-header.component.html',
  styleUrls: ['./reports-header.component.css'],
})
export class ReportsHeaderComponent implements OnInit {
  @Input() departments: Array<Department>;
  @Output() setDepartment: EventEmitter<Department> = new EventEmitter();
  @Input() clients: Array<ProjectsByClient>;
  @Output() setClient: EventEmitter<Array<Project>> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  setDepartmentHandle(department: Department) {
    this.setDepartment.emit(department);
  }

  setClientHandler(client: ProjectsByClient) {
    this.setClient.emit(client.projects);
  }
}

