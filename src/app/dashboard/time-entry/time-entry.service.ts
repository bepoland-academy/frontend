import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { TimeEntryResponse, TimeEntry, Day, ProjectsResponse, ProjectsByClient, Project } from '../../core/models';
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
    const user = JSON.parse(localStorage.getItem('user'));
    return forkJoin([
      this.httpService
        .fakeGet(`http://localhost:3000/${week}`)
        .pipe(
          flatMap((timeEntriesResponse: TimeEntryResponse) => {
            if (timeEntriesResponse._embedded) {
              return of(timeEntriesResponse._embedded.timeEntries);
            }
            const weekBefore: number = +week.substr(6, 2) - 1;
            return this.httpService.fakeGet(`http://localhost:3000/${week.substring(0, 6)}${weekBefore}`)
              .pipe(
                map((secondResponse: TimeEntryResponse) => secondResponse._embedded.timeEntries),
                map((timeEtries: Array<TimeEntry>) => timeEtries.map(project => ({
                  ...project,
                  weekDays: project.weekDays.map(day => ({...day, status: ''})),
                })))
              );
          })
        ),
      this.httpService
        .get(`projects?department=${user.department}`)
        .pipe(
          map((projectsResponse: ProjectsResponse) => projectsResponse._embedded.projectBodyList)
        ),
    ]).pipe(map((data: [Array<TimeEntry>, Array<Project>]) => {
      let timeEntries: Array<TimeEntry> = data[0] || [];
      const projects: Array<Project> = data[1] || [];
      timeEntries = timeEntries.map((entry: TimeEntry) => ({
        ...entry,
        weekDays: sortWeekByDate(entry.weekDays),
        projectInfo: projects.filter(project => entry.projectId === project.projectId)[0],
      }));
      const groupedProjects: Array<ProjectsByClient> = groupProjectsByClient(projects);
      return [timeEntries, groupedProjects];
    }));
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
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
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
      days.push(day.format('DD-MM-YYYY'));
      day = day.add(1, 'd');
    }
    return days;
  }

}
