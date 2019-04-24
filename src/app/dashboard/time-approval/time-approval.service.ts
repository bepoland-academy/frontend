import { Injectable } from '@angular/core';
import { Observable, forkJoin, BehaviorSubject, of } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import {
  User,
  UsersResponse,
  Project,
  MonthTimeEntryResponse,
  Links,
  MonthTimeEntry,
  MonthTimeEntryWithoutProjectInfo,
  UserWithTimeSheetWithoutSubbmitedHours,
  UserWithTimeSheet
} from '../../core/models';
import { map, flatMap } from 'rxjs/operators';


@Injectable()
export class TimeApprovalService {
  projects = new BehaviorSubject([]);

  constructor(private httpService: HttpService) {
    this.httpService.getProjectsStream().subscribe((projects: Array<Project>) => {
      this.projects.next(projects);
    });
  }

  getProjects(): Observable<Array<Project>> {
    return this.projects.asObservable();
  }

  // this method should call only if projects fetching is ended
  getUsersWithTimeEntries(month: string): Observable<Array<UserWithTimeSheet>> {
    const loggedInUser: User = JSON.parse(localStorage.getItem('user'));
    return this.httpService.get(`users?department=${loggedInUser.department}`)
      .pipe(
        map((res: UsersResponse): Array<User> => res._embedded.userBodyList),
        flatMap((users: Array<User>): Observable<UserWithTimeSheetWithoutSubbmitedHours[]> => {
          const projects: Array<Project> = this.projects.getValue();
          // go through all array of users and get for every user his month timesheet and with forkJoin wait till all
          // http requests ends
          return forkJoin<UserWithTimeSheetWithoutSubbmitedHours>(
            users.map((user: User) => {
              return this.httpService
                .get(`managers/${loggedInUser.department}/consultants/${user.userId}/months/${month}`)
                .pipe(
                  map((userTimeSheetResponse: MonthTimeEntryResponse): UserWithTimeSheetWithoutSubbmitedHours => {
                    let _links: Links = {
                      self: {
                        href: `${this.httpService.url}managers/${loggedInUser.department}/consultants/${user.userId}/months/${month}`,
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
                      ...user,
                      monthTimeSheet,
                      _links,
                    };
                  })
                );
            })
          );
        }),
        // users with their timesheet for selected month and adding submittedHours with suming all hours for
        // user with status subbmitted
        map((usersWithTimeSheets: Array<UserWithTimeSheetWithoutSubbmitedHours>): Array<UserWithTimeSheet> => {
          return usersWithTimeSheets.map((userAndTimeSheet) => ({
            ...userAndTimeSheet,
            // submittedHours: calculating all hours with status SUBMITTED only!!!!
            submittedHours: userAndTimeSheet.monthTimeSheet
              .flatMap(projectTimeSheet =>
                projectTimeSheet.monthDays.map(day =>
                  day.status === 'SUBMITTED' ? day.hours : 0).reduce((sum, val) => sum + val, 0)
              )
              .reduce((sum, val) => sum + val, 0),
          }));
        }),
        map((afterMergingResponse: Array<UserWithTimeSheet>) => {
          // sorting all users by lastname
          afterMergingResponse.sort((a: UserWithTimeSheet, b: UserWithTimeSheet) => {
            if (a.lastName < b.lastName) { return -1; }
            if (a.lastName > b.lastName) { return 1; }
            return 0;
          });

          // and sorting users by subbmitted hours, if they have something to approve they are going up list
          afterMergingResponse.sort((a: UserWithTimeSheet) => {
            if (a.submittedHours) { return -1; }
            return 0;
          });
          return afterMergingResponse;
        })
      );
  }
}


