import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ReportsService } from './reports.service';
import { Department, ProjectsByClient, Project, Rate } from 'src/app/core/models';
import { groupProjectsByClient } from 'src/app/shared/utils/groupProjectsByClient';
import { HttpService } from 'src/app/core/services/http.service';
import { AssignedConsultant, Week, ConsultantWithTimesheet } from './models';
import * as moment from 'moment';


const checkForOnsiteRate = (arr: Array<AssignedConsultant>): Array<AssignedConsultant> => {
  let arrWithOnsite: Array<AssignedConsultant> = [];
  arr.forEach(el => {
    const isOnSite: boolean = arrWithOnsite.some(o => o.consultantId === el.consultantId && o.roleId === el.roleId);
    if (isOnSite) {
      arrWithOnsite.push({...el, isOnSite});
      return;
    }
    arrWithOnsite = [...arrWithOnsite, el];
  });
  return arrWithOnsite;
};

const getConsultantWithAssignedRate = (project: Project): Array<AssignedConsultant> =>
  project.rates.flatMap((rate: Rate) =>
    rate.consultants.map((consultantId: string) =>
      ({
        consultantId,
        rate: rate.rate,
        onSiteRate: rate.onSiteRate || 0,
        projectId: project.projectId,
        roleId: rate.roleId,
      })
    )
  );

const duplicateIfItOnsite = (acc: Array<AssignedConsultant>, el: AssignedConsultant): Array<AssignedConsultant> => {
  if (!!el.onSiteRate) {
    return [...acc, el, el];
  }
  return [...acc, el];
};

const assignUserstoRate = (projects: Array<Project>): Array<AssignedConsultant> => {
  return projects
    .flatMap(getConsultantWithAssignedRate)
    .reduce(duplicateIfItOnsite, []);
};

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription = new Subscription();
  departments: Array<Department>;
  clients: Array<ProjectsByClient>;
  weeksInMonth: Array<Week> = [];
  usersTimesheet: Array<ConsultantWithTimesheet> = [];
  currentDate: string;
  currentClient: ProjectsByClient;
  constructor(
    private reportsService: ReportsService,
    private httpServie: HttpService
  ) { }

  ngOnInit() {
    this.currentDate = moment().format('YYYY-MM');
    this.weeksInMonth = this.reportsService.getWeeksInMonth(this.currentDate);
    this.subscriptions.add(
      this.reportsService.getDepartments().subscribe((departments: Array<Department>) => {
        this.departments = departments;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  setDepartment(department: Department) {
    const projectList: Array<Project> = this.httpServie.projectsStream
      .getValue()
      .filter(el => el.departmentGuid === department.departmentId);

    this.clients = groupProjectsByClient(projectList);
  }

  setClient(client: ProjectsByClient) {
    const usersId: Array<AssignedConsultant> = assignUserstoRate(client.projects);
    const usersWithRates: Array<AssignedConsultant> = checkForOnsiteRate(usersId);
    this.currentClient = client;
    this.subscriptions.add(
      this.reportsService.getUsersWithTimeSheet(usersWithRates, this.currentDate)
        .subscribe((users: Array<ConsultantWithTimesheet>) => {
          this.usersTimesheet = users;
        })
    );
  }

  setCurrentDate(date: Date) {
    this.currentDate = moment(date).format('YYYY-MM');
    this.weeksInMonth = this.reportsService.getWeeksInMonth(this.currentDate);
    this.setClient(this.currentClient);
  }
}
