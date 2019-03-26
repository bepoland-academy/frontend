import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { HttpService } from '../../core/services/http.service';
import { map, flatMap } from 'rxjs/operators';
import { forkJoin, of } from 'rxjs';
import { groupProjectsByClient } from '../../shared/utils/groupProjectsByClient';




const sortWeekByDate = (project) => project.sort((first, second) => {
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
    const user = JSON.parse(localStorage.getItem('user'));
    return forkJoin([
      this.httpService
        .fakeGet(`http://localhost:3000/${week}`)
        .pipe(
          flatMap((timeEntriesResponse) => {
            if (timeEntriesResponse._embedded) {
              return of(timeEntriesResponse._embedded.timeEntries);
            }
            const weekBefore = +week.substr(6, 2) - 1;
            return this.httpService.fakeGet(`http://localhost:3000/${week.substring(0, 6)}${weekBefore}`)
              .pipe(
                map(secondResponse => secondResponse._embedded.timeEntries),
                map(secondResponse => secondResponse.map(project => ({
                  ...project,
                  weekDays: project.weekDays.map(day => ({...day, status: ''})),
                })))
              );
          })
        ),
      this.httpService
        .get(`projects?department=${user.department}`)
        .pipe(
          map(projectsResponse => projectsResponse._embedded.projectBodyList)
        ),
    ]).pipe(map(data => {
      console.log(data);
      let timeEntries = data[0] || [];
      let projects = data[1] || [];
      timeEntries = timeEntries.map(entry => ({
        ...entry,
        weekDays: sortWeekByDate(entry.weekDays),
        projectInfo: projects.filter(project => entry.projectId === project.projectId)[0],
      }));
      projects = groupProjectsByClient(projects);
      return [timeEntries, projects];
    }));
  }

  createAttributesForNewProject(project, { year, week }) {
    return {
      projectInfo: project,
      weekDays: this.getFullWeekDaysWithDate(year, week),
      week: `${year}-W${week}`,
      projectId: project.projectId,
    };
  }

  getFullWeekDaysWithDate(year, week) {
    let dates = [];
    dates = this.getCurrentFullWeek(year, week);
    const weekDays = [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ];
    return dates.map((date, index) => ({
      date,
      day: weekDays[index],
      hours: 0,
      status: '',
      comment: '',
    }));
  }

  getCurrentFullWeek(year, week) {
    const startOfWeek = moment(year, 'YYYY')
      .week(week)
      .startOf('isoWeek');

    const endOfWeek = moment(year, 'YYYY')
      .week(week)
      .endOf('isoWeek');

    const days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.format('DD-MM-YYYY'));
      day = day.add(1, 'd');
    }
    return days;
  }

}
