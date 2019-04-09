import { Injectable } from '@angular/core';

import { HttpService } from 'src/app/core/services/http.service';
import { User, Links, MonthTimeEntry, MonthTimeEntryResponse, UserWithTimeSheetWithoutSubbmitedHours, MonthTimeEntryWithoutProjectInfo, Project } from 'src/app/core/models';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class HistoricalDataService {
  projects: BehaviorSubject<any> = new BehaviorSubject([]);
  constructor(
    private httpService: HttpService
  ) {
    this.httpService.getProjectsStream().subscribe((projects: Array<Project>) => {
      this.projects.next(projects);
    });
  }

  getProjects(): Observable<Array<Project>> {
    return this.projects.asObservable();
  }

  getConsultantTimeSheet(month: string) {
    const loggedInUser: User = JSON.parse(localStorage.getItem('user'));
    return this.httpService
      .get(`consultants/${loggedInUser.userId}/months/${month}`)
      .pipe(
        map((userTimeSheetResponse: MonthTimeEntryResponse) => {
          const projects = this.httpService.getProjectsStream().value;
          let _links: Links = {
            self: {
              href: `${this.httpService.url}/consultants/${loggedInUser.department}/months/${month}`,
            },
          };
          let monthTimeSheet: MonthTimeEntry[] = [];

          // if there is response transfrom from embeded and get all infos and links and add to every project
          // projectInfo property
          if (userTimeSheetResponse._embedded) {
            _links = userTimeSheetResponse._links;
            monthTimeSheet = userTimeSheetResponse._embedded.monthTimeEntryBodyList
              .map((timeSheet: MonthTimeEntryWithoutProjectInfo) => (
                {
                  ...timeSheet,
                  projectInfo: projects.find((o: Project) => o.projectId === timeSheet.projectId),
                }
              ));
          }

          // otherwise set default values where there is no response
          return {
            ...loggedInUser,
            monthTimeSheet,
            _links,
          };
        }),
        map((usersWithTimeSheets) => {
          return {
            ...usersWithTimeSheets,
            submittedHours: usersWithTimeSheets.monthTimeSheet
              .flatMap(projectTimeSheet =>
                projectTimeSheet.monthDays.map(day =>
                  day.status === 'SUBMITTED' ? day.hours : 0).reduce((sum, val) => sum + val, 0)
              )
              .reduce((sum, val) => sum + val, 0),
          };
        })

      );

  }
}
