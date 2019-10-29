import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from 'src/app/core/services/http.service';
import {
  DepartmentsResponse,
  UserWithTimeSheetWithoutSubbmitedHours,
  Department,
  Project,
  MonthTimeEntryResponse,
  Links,
  MonthTimeEntry,
  MonthTimeEntryWithoutProjectInfo,
  UsersResponse,
  User,
  Day,
  RolesResponse,
  Role
} from 'src/app/core/models';
import * as moment from 'moment';
import { AssignedConsultant, Week, ConsultantWithTimesheet } from './models';
import { GlobalDataService } from 'src/app/core/services/global-data.service';


const getWeekFromDateAndHours = (day: Day): Week => {
  const week = moment(day.date, 'YYYY-MM-DD').week();
  return {
    week,
    hours: day.hours,
  };
};

const daysWithStatusApproved = (day: Day): boolean => {
  return day.status === 'APPROVED';
};

const sumHoursFromSameWeek = (acc: Array<Week>, week: Week): Array<Week> => {
  if (!acc.some(o => o.week === week.week)) {
    return [...acc, week];
  }
  const index = acc.findIndex(o => o.week === week.week);
  acc[index].hours += week.hours;
  return acc;
};


@Injectable()
export class ReportsService {
  users: BehaviorSubject<Array<User>> = new BehaviorSubject([]);
  roles: BehaviorSubject<Array<Role>> = new BehaviorSubject([]);
  weeksInMonth: Array<Week> = [];
  constructor(
    private httpService: HttpService,
    private globalData: GlobalDataService
  ) {
    this.getAllUsers().subscribe((response: UsersResponse) => {
      this.users.next(response._embedded.userBodyList);
    });

    this.getRoles().subscribe((response: RolesResponse) => {
      this.roles.next(response._embedded.roleBodyList);
    });
  }

  getDepartments(): Observable<Array<Department>> {
    return this.httpService.get('departments')
      .pipe(
        map((response: DepartmentsResponse) => response._embedded.departmentBodyList)
      );
  }

  getWeeksInMonth(yearWithMonth: string): Array<Week> {
    const date = moment(yearWithMonth, 'YYYY-MM');
    const startOfMonth: number = date.clone().startOf('month').isoWeek();
    let endOfMonth: number = date.clone().endOf('month').isoWeek();
    if (startOfMonth > endOfMonth) {
      endOfMonth = 52;
    }
    let weekNumbers: Array<Week> = [];
    for (let i = startOfMonth; i <= endOfMonth; i ++) {
      weekNumbers = [...weekNumbers, {week: i, hours: 0}];
    }

    const isEndOfMonthIsInNextYear: boolean = date.clone().endOf('month').isoWeek() !== endOfMonth;
    if (isEndOfMonthIsInNextYear) {
      weekNumbers = [...weekNumbers, {week: 1, hours: 0}];
    }

    this.weeksInMonth = weekNumbers;
    return weekNumbers;
  }

  getWeekSum(monthTimeSheet: Array<Day>): Array<Week> {
    if (!monthTimeSheet.length) {
      return this.weeksInMonth;
    }

    const weeksWithHours: Array<Week> = monthTimeSheet
      .filter(daysWithStatusApproved)
      .map(getWeekFromDateAndHours)
      .reduce(sumHoursFromSameWeek, []);

    const isLenghtEqual: boolean = weeksWithHours.length === this.weeksInMonth.length;

    if (isLenghtEqual) {
      return weeksWithHours;
    }

    return weeksWithHours
      .concat(this.weeksInMonth)
      .reduce(sumHoursFromSameWeek, [])
      .sort((first: Week, second: Week) => {
        if (first.week < second.week) { return -1; }
        if (first.week > second.week) { return 1; }
        return 0;
      });

  }

  getAllUsers(): Observable<UsersResponse> {
    return this.httpService.get('users');
  }

  getUsersWithTimeSheet(usersWithRates: Array<AssignedConsultant>, month: string): Observable<ConsultantWithTimesheet[]> {
    this.getWeeksInMonth(month);
    const usersId = usersWithRates
      .map(o => o.consultantId)
      .filter((el: string, i: number, self: Array<string>) => self.indexOf(el) === i);

    const projects = this.globalData.getProjectsValue;
    const roles = this.roles.getValue();

    return forkJoin(
      usersId.map(id => {
        return this.httpService.get(`consultants/${id}/months/${month}`).pipe(
          map((response: MonthTimeEntryResponse) => {
            let _links: Links = {};
            let monthTimeSheet: MonthTimeEntry[] = [];
            const user: User = this.users.getValue().find((o: User) => o.userId === id);

            // if there is response transfrom from embeded and get all infos and links and add to every project
            // projectInfo property
            if (response._embedded) {
              _links = response._links;
              monthTimeSheet = response._embedded.monthTimeEntryBodyList
                .map((timeSheet: MonthTimeEntryWithoutProjectInfo) => (
                  {
                    ...timeSheet,
                    projectInfo: projects.find((o: Project) => o.projectId === timeSheet.projectId),
                  }
                ));
            }

            // otherwise set default values where there is no response
            return {
              ...user,
              monthTimeSheet,
              _links,
            };
          }),
          map((user: UserWithTimeSheetWithoutSubbmitedHours): Array<ConsultantWithTimesheet> => {
            const {firstName, lastName, userId, monthTimeSheet} = user;

            const getProject = (projectId: string): string =>
              projects.find((o: Project) => o.projectId === projectId).name;

            const getSpecificProjectTimeSheet = (projectId: string) => {
              const projectTimeSheet = monthTimeSheet.find((o: MonthTimeEntry) => o.projectId === projectId);
              if (projectTimeSheet) {
                return projectTimeSheet.monthDays;
              }
              return [];
            };
            return usersWithRates
              .filter(el => el.consultantId === userId)
              .map(el => {
                const projectTimeSheet = getSpecificProjectTimeSheet(el.projectId);
                const weeks = this.getWeekSum(projectTimeSheet);
                const allHours = weeks.map(week => week.hours).reduce((acc, n) => acc + n, 0);
                const revenue = el.isOnSite ? (allHours * el.onSiteRate) : (allHours * el.rate);
                const roleName = roles.find(o => o.roleId === el.roleId).name;
                return {
                  ...el,
                  firstName,
                  lastName,
                  projectName: getProject(el.projectId),
                  weeks,
                  allHours,
                  revenue,
                  roleName,
                };
              });
          })
        );
      })
    ).pipe(
      map((el: [Array<ConsultantWithTimesheet>, Array<ConsultantWithTimesheet>]) => el.flat())
    );
  }

  getRoles(): Observable<RolesResponse> {
    return this.httpService.get('projects/roles/all');
  }

}
