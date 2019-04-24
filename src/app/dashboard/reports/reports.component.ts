import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReportsService } from './reports.service';
import { Department, ProjectsByClient, Project } from 'src/app/core/models';
import { groupProjectsByClient } from 'src/app/shared/utils/groupProjectsByClient';


const checkForOnsiteRate = (arr) => {
  let arrWithOnsite = [];
  arr.forEach(el => {
    const isOnSite = arrWithOnsite.some(o => o.consultantId === el.consultantId && o.roleId === el.roleId);
    if (isOnSite) {
      arrWithOnsite.push({...el, isOnSite});
      return;
    }
    arrWithOnsite = [...arrWithOnsite, el];
  });
  return arrWithOnsite;
};

const getConsultantWithAssignedRate = project =>
  project.rates.flatMap(role =>
    role.consultants.map(consultantId =>
      ({
        consultantId,
        rate: role.rate,
        onSiteRate: role.onSiteRate || 0,
        projectId: project.projectId,
        roleId: role.role_id,
      })
    )
  );

const duplicateIfItOnsite = (acc, el) => {
  if (!!el.onSiteRate) {
    return [...acc, el, el];
  }
  return [...acc, el];
};

const assignUserstoRate = (projects) => {
  return projects
    .flatMap(getConsultantWithAssignedRate)
    .reduce(duplicateIfItOnsite, []);
};

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  subscriptions: Subscription = new Subscription();
  departments: Array<Department>;
  clients: Array<ProjectsByClient>;
  currentDate = '2019-04';
  weeksInMonth = [];
  usersTimesheet = [];
  constructor(
    private reportsService: ReportsService
  ) { }

  ngOnInit() {
    this.weeksInMonth = this.reportsService.getWeeksInMonth(this.currentDate);
    this.subscriptions.add(
      this.reportsService.getDepartments().subscribe((departments: Array<Department>) => {
        this.departments = departments;
      })
    );
  }

  setDepartment(department: Department) {
    this.subscriptions.add(
      this.reportsService.getProjects(department.departmentId).subscribe((projects: Array<Project>) => {
        console.log(projects);
        this.clients = groupProjectsByClient(projects);
      })
    );
  }

  setClient(projects: Array<Project>) {
    const usersId = assignUserstoRate(projects);
    const usersWithRates = checkForOnsiteRate(usersId);
    this.reportsService.getUsersWithTimeSheet(usersWithRates, this.currentDate).subscribe(b => {
      this.usersTimesheet = b;
      console.log(b);
    });

  }
}
