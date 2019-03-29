import { Injectable } from '@angular/core';

import * as moment from 'moment';
import {
  TimeEntryResponse,
  TimeEntry,
  Day,
  ProjectsResponse,
  ProjectsByClient,
  Project,
  User
} from '../../core/models';
import { HttpService } from '../../core/services/http.service';
import { map, flatMap } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import { groupProjectsByClient } from '../../shared/utils/groupProjectsByClient';




const sortWeekByDate = (weekDays: Array<Day>) => weekDays.sort((first: Day, second: Day) => {
  const firstEl = moment(first.date, 'DD-MM-YYYY');
  const secondEl = moment(second.date, 'DD-MM-YYYY');
  if (firstEl > secondEl) {
    return 1;
  }
  if (firstEl < secondEl) {
    return -1;
  }
  return 0;
});

@Injectable()
export class TimeEntryService {
  constructor(private httpService: HttpService) {}

  fetchTracks(week: string) {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return forkJoin([
      this.getTimeEntries(week),
      this.httpService
        .get(`projects?department=${user.department}`)
        .pipe(
          map((projectsResponse: ProjectsResponse) => projectsResponse._embedded.projectBodyList)
        ),
    ]).pipe(map((data) => {
      let timeEntries = data[0].timeEntries || [];
      const projects = data[1] || [];
      const links = data[0]._links || {};
      timeEntries = timeEntries.map((entry) => ({
        ...entry,
        weekDays: sortWeekByDate(entry.weekDays),
        projectInfo: projects.filter(project => entry.projectId === project.projectId)[0],
      }));
      const groupedProjects = groupProjectsByClient(projects);
      return [timeEntries, groupedProjects, {...links}];
    }));
  }

  getTimeEntries(week) {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return this.httpService
      .get(`consultants/${user.userId}/weeks/${week}`)
      .pipe(
        flatMap((timeEntriesResponse: TimeEntryResponse) => {
          if (timeEntriesResponse._embedded) {
            return of({
              timeEntries: timeEntriesResponse._embedded.weekTimeEntryBodyList,
              _links: timeEntriesResponse._links,
            });
          }
          let weekBefore: any = +week.substr(6, 2) - 1;
          if (weekBefore < 10) {
            weekBefore = `0${weekBefore}`;
          }
          return this.httpService.get(`consultants/${user.userId}/weeks/${week.substring(0, 6)}${weekBefore}`)
            .pipe(
              map((secondResponse: TimeEntryResponse) => {
                if (secondResponse._embedded) {
                  return {
                    timeEntries: secondResponse._embedded.weekTimeEntryBodyList,
                    _links: '',
                  };
                }
                return { timeEntries: [], _links: '' };
              }),
              map((result) => ({
                ...result,
                timeEntries: result.timeEntries.map(project => ({
                  ...project,
                  weekDays: project.weekDays.map(day => ({ ...day, status: '' })),
                })),
              }))
            );
        })
      );
  }

  sendNewEntries(week, body) {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return this.httpService.post(`consultants/${user.userId}/weeks/${week}`, body);
  }

  updateEntries(url, body) {
    return this.httpService.put(url, body);
  }

  createAttributesForNewProject(project: Project, { year, week }): TimeEntry {
    return {
      projectInfo: project,
      weekDays: this.getFullWeekDaysWithDate(year, week),
      week: `${year}-W${week}`,
      projectId: project.projectId,
    };
  }

  getFullWeekDaysWithDate(year: number, week: number): Array<Day> {
    const dates: Array<string> = this.getCurrentFullWeek(year, week);
    const weekDays = [
      'MONDAY',
      'TUESDAY',
      'WEDNESDAY',
      'THURSDAY',
      'FRIDAY',
      'SATURDAY',
      'SUNDAY',
    ];
    return dates.map((date: string, index: number) => ({
      date,
      day: weekDays[index],
      hours: 0,
      status: '',
      comment: '',
    }));
  }

  getCurrentFullWeek(year: number, week: number): Array<string> {
    const startOfWeek = moment(year, 'YYYY')
      .week(week)
      .startOf('isoWeek');

    const endOfWeek = moment(year, 'YYYY')
      .week(week)
      .endOf('isoWeek');

    const days: Array<string> = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.format('YYYY-MM-DD'));
      day = day.add(1, 'd');
    }
    return days;
  }

}
