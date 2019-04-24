import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, forkJoin } from 'rxjs';

import { HttpService } from 'src/app/core/services/http.service';
import { DepartmentsResponse, UserWithTimeSheetWithoutSubbmitedHours, ProjectsResponse, Department, Project, MonthTimeEntryResponse, Links, MonthTimeEntry, MonthTimeEntryWithoutProjectInfo, UsersResponse, User, UserWithTimeSheet, Day, RolesResponse, Role } from 'src/app/core/models';
import { map, flatMap } from 'rxjs/operators';
import * as moment from 'moment';

const getWeekFromDateAndHours = (day: Day) => {
  const week = moment(day.date, 'YYYY-MM-DD').week();
  return {
    week,
    hours: day.hours,
  };
};

const daysWithStatusApproved = (day: Day): boolean => {
  return day.status === 'APPROVED';
};

const sumHoursFromSameWeek = (acc, week) => {
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
  projects: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);
  roles: BehaviorSubject<Array<Role>> = new BehaviorSubject([]);
  weeksInMonth = [];
  constructor(
    private httpService: HttpService
  ) {
    this.getAllUsers().subscribe((response: UsersResponse) => {
      this.users.next(response._embedded.userBodyList);
    });

    this.getRoles().subscribe((response: RolesResponse) => {
      this.roles.next(response._embedded.roleBodyList);
    });
  }

  getDepartments(): Observable<Array<Department>> {
    return this.httpService.get('/departments')
      .pipe(
        map((response: DepartmentsResponse) => response._embedded.departmentBodyList)
      );
  }

  getWeeksInMonth(yearWithMonth) {
    const date = moment(yearWithMonth, 'YYYY-MM');
    const startOfMonth = date.startOf('month').week();
    const endOfMonth = date.endOf('month').week();
    let weekNumbers = [];
    for (let i = startOfMonth; i <= endOfMonth; i ++) {
      weekNumbers = [...weekNumbers, {week: i, hours: 0}];
    }
    this.weeksInMonth = weekNumbers;
    return weekNumbers;
  }

  getWeekSum(monthTimeSheet) {
    if (!monthTimeSheet.length) {
      return this.weeksInMonth;
    }

    const weeksWithHours = monthTimeSheet
      .filter(daysWithStatusApproved)
      .map(getWeekFromDateAndHours)
      .reduce(sumHoursFromSameWeek, []);

    const isLenghtEqual = weeksWithHours.length === this.weeksInMonth.length;

    if (isLenghtEqual) {
      return weeksWithHours;
    }


    return weeksWithHours
      .concat(this.weeksInMonth)
      .reduce(sumHoursFromSameWeek, [])
      .sort((first, second) => {
        if (first.week < second.week) { return -1; }
        if (first.week > second.week) { return 1; }
        return 0;
      });

  }

  getAllUsers() {
    return this.httpService.get('users');
  }

  getUsersWithTimeSheet(usersWithRates, month) {
    this.getWeeksInMonth(month);
    const usersId = usersWithRates
      .map(o => o.consultantId)
      .filter((el, i, self) => self.indexOf(el) === i);

    const projects = this.projects.getValue();
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
          map((user: UserWithTimeSheetWithoutSubbmitedHours) => {
            const {firstName, lastName, userId, monthTimeSheet} = user;

            const getProject = (projectId) => projects.find((o: Project) => o.projectId === projectId).name;
            const getSpecificProjectTimeSheet = (projectId) => {
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
                if (el.consultantId === '7bb710ee-c16c-4c58-8343-73854a461160') {
                  console.log(el);
                  console.log('----------------------------------');
                }
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
      map(el => el.flatMap(a => a))
    );
  }

  getRoles() {
    return this.httpService.get('projects/roles/all');
  }

  // TODO: Project by client endpoint
  getProjects(departmentId: string): Observable<Array<Project>> {
    return this.httpService.get(`projects?department=${departmentId}`)
      .pipe(
        map((response: ProjectsResponse) => response._embedded.projectBodyList)
      );
  }
}
