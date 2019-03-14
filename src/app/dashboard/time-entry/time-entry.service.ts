import { Injectable } from '@angular/core';

import * as moment from 'moment';
import { HttpService } from '../../services/http.service';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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
  constructor(private httpService: HttpService) {
    this.fetchTracks();
  }
  endpoint = 'tracks';
  tracks = new BehaviorSubject({ entries: [] });

  fetchTracks() {
    return this.httpService
      .fakeGet('http://localhost:3000/tracks')
      .pipe(
        map(
          // sorting week by date, from monday to sunday (backend mess up with it for eg)
          resp => ({
            ...resp,
            entries: resp.entries.map(client => ({
              ...client,
              projects: client.projects.map(project => ({
                ...project,
                weekDays: sortWeekByDate(project.weekDays),
              })),
            })),
          })
        ),
        tap(res => this.tracks.next(res))
      )
      .subscribe(() => {});
  }

  removeProject(client, project) {
    const currentValues = this.tracks.value;
    if (client.projects.length === 1) {
      const modifiedClients = currentValues.entries.filter(cl => cl.clientName !== client.clientName);
      this.tracks.next({...currentValues, entries: modifiedClients});
    } else {
      const clientProjects = currentValues.entries.find(cl => cl.clientName === client.clientName);
      clientProjects.projects = clientProjects.projects.filter(
        proj => proj.projectName === project.projectName
      );
    }
  }

  getTracks() {
    return this.tracks.asObservable();
  }

  createNewEntry(clientName, project) {
    const actualResponse = this.tracks.value;
    const listOfAllClients = actualResponse.entries;
    const isClientExists = listOfAllClients.some(
      client => client.clientName === clientName
    );
    const newProject = {
      projectName: project,
      weekDays: this.getFullWeekDaysWithDate(11),
    };
    if (isClientExists) {
      const foundedClient = listOfAllClients.find(
        client => client.clientName === clientName
      );
      foundedClient.projects = [...foundedClient.projects, newProject];
    } else {
      const newClientWithProject = {
        clientName,
        projects: [newProject],
      };
      listOfAllClients[listOfAllClients.length] = newClientWithProject;
    }
  }

  getCurrentFullWeek(week) {
    const startOfWeek = moment()
      .week(week)
      .startOf('isoWeek');

    const endOfWeek = moment()
      .week(week)
      .endOf('isoWeek');

    const days = [];
    let day = startOfWeek;
    while (day <= endOfWeek) {
      days.push(day.format('DD-MM-YYYY'));
      day = day.clone().add(1, 'd');
    }
    return days;
  }

  getFullWeekDaysWithDate(week) {
    const dates = this.getCurrentFullWeek(week);
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
      approved: false,
    }));
  }
}
