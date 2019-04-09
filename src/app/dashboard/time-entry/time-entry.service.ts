import { Injectable } from '@angular/core';

import * as moment from 'moment';
import {
  TimeEntryResponse,
  TimeEntry,
  Day,
  Project,
  TimeEntriesWithLinks,
  TimeEntriesWithLinksAndProjects,
  User
} from '../../core/models';
import { HttpService } from '../../core/services/http.service';
import { map, flatMap } from 'rxjs/operators';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { sortDaysByDate } from '../../shared/utils/sortDaysByDate';


@Injectable()
export class TimeEntryService {
  projects: BehaviorSubject<Array<Project>> = new BehaviorSubject([]);

  constructor(private httpService: HttpService) {
    this.httpService.getProjectsStream().subscribe((projects: Array<Project>) => {
      this.projects.next(projects);
    });
  }

  fetchTracks(week: string): Observable<TimeEntriesWithLinksAndProjects> {
    return this.getTimeEntries(week)
      .pipe(
        map((timeEntriesWithLinks) => {
          const projectList: Array<Project> = this.projects.getValue();

          // adding projectInfo to time entry array, because it does not exist sorry for no type :)
          return {
            ...timeEntriesWithLinks,
            projectList,
            timeEntries: timeEntriesWithLinks.timeEntries.map(timeEntry => ({
              ...timeEntry,
              projectInfo: projectList.find(o => o.projectId === timeEntry.projectId),
            })),
          };

        })
      );
  }

  getProjects(): Observable<Array<Project>> {
    return this.projects.asObservable();
  }

  getTimeEntries(week): Observable<TimeEntriesWithLinks> {
    const user: User = JSON.parse(localStorage.getItem('user'));
    return this.httpService
      .get(`consultants/${user.userId}/weeks/${week}`)
      .pipe(
        flatMap((timeEntriesResponse: TimeEntryResponse) => {

          // if there is response from backend
          if (timeEntriesResponse._embedded) {
            return of({
              timeEntries: timeEntriesResponse._embedded.weekTimeEntryBodyList,
              _links: timeEntriesResponse._links,
            });
          }

          // if there is no response from backend so we fetch previous weekend
          return this.getTimeEntriesFromPreviousWeek(week);
        })
      );
  }

  getTimeEntriesFromPreviousWeek(week: string): Observable<TimeEntriesWithLinks> {
    const user: User = JSON.parse(localStorage.getItem('user'));
    const currentYear: number = +week.substring(0, 4);
    const currentWeek: number = +week.substr(6, 2);
    let weekBefore: number | string = currentWeek - 1;
    let yearBefore: number | string = currentYear;

    // adding prefix 0 if week is lower than 10 (only for backend purposes is needed)
    if (weekBefore < 10) {
      weekBefore = `0${weekBefore}`;
    }

    // subtracting one year if current week is lower than one
    if (+weekBefore < 1) {
      yearBefore = yearBefore - 1;
      weekBefore = 52;
    }

    const finalYearWithWeek = `${yearBefore}-W${weekBefore}`;
    return this.httpService.get(`consultants/${user.userId}/weeks/${finalYearWithWeek}`)
      .pipe(
        map((secondResponse: TimeEntryResponse) => {
          // returning response if exists
          if (secondResponse._embedded) {
            return {
              timeEntries: secondResponse._embedded.weekTimeEntryBodyList,
              _links: {},
            };
          }

          // default return when there is no response
          return { timeEntries: [], _links: {} };
        }),
        map((result: TimeEntriesWithLinks) => ({
          ...result,
          // mapping all entries to fit to current week
          timeEntries: result.timeEntries.map((timeEntry: TimeEntry) => ({
            ...timeEntry,
            // setting status to be empty
            weekDays: this.setProjectWeekDaysToCurrentDate(timeEntry.weekDays, currentYear, currentWeek),
            week: finalYearWithWeek,
          })),
        }))
      );
  }

  // reseting status from project and comments
  setProjectWeekDaysToCurrentDate(weekDays: Array<Day>, year: number, week: number): Array<Day> {
    const currentWeekDays: Array<Day> = this.getFullWeekDaysWithDate(year, week);
    const sortedWeekDays: Array<Day> = sortDaysByDate(weekDays);
    return sortedWeekDays.map((day: Day, index: number) => ({
      ...day,
      date: currentWeekDays[index].date,
      status: '',
      comment: '',
    }));
  }

  createAttributesForNewEntry(project: Project, { year, week }): TimeEntry {
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
