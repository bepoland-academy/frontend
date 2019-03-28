import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { User, UsersResponse, UserTimeMonthlyResponse } from '../../core/models';
import { map, flatMap } from 'rxjs/operators';

@Injectable()

export class TimeApprovalService {

  constructor(private httpService: HttpService) { }

  getUsersTime(month) {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    return forkJoin([
      this.httpService.get(`users?department=${loggedInUser.department}`)
        .pipe(
          map(res => res._embedded.userBodyList),
          flatMap(users => {
            return forkJoin(
              users.map(user => {
                return this.httpService
                  .get(`managers/${loggedInUser.department}/consultants/${user.userId}/months/${month}`)
                .pipe(
                  map(userTimeSheetResponse => {
                    let _links = {};
                    let monthTimeSheet =  [];
                    if (userTimeSheetResponse._embedded) {
                      monthTimeSheet = userTimeSheetResponse._embedded.monthTimeEntryBodyList;
                      _links = userTimeSheetResponse._links;
                    }
                    return {
                      ...user,
                      monthTimeSheet,
                      _links,
                    };
                  })
                );
              })
            );
          })
        ),
      this.httpService.get(`projects?department=${loggedInUser.department}`)
        .pipe(
          map(projectsResponse => projectsResponse._embedded.projectBodyList)
        ),
    ]).pipe(
      map(afterForkJoin => {
        const usersWithTimeSheets = afterForkJoin[0];
        const projects = afterForkJoin[1];
        return usersWithTimeSheets.map((user: any) => ({
          ...user,
          monthTimeSheet: user.monthTimeSheet.map(projectTimeSheet => ({
              ...projectTimeSheet,
              projectInfo: projects.find(el => el.projectId === projectTimeSheet.projectId),
            })
          ),
          submittedHours: user.monthTimeSheet
            .flatMap(projectTimeSheet =>
              projectTimeSheet.monthDays.map(day => day.status === 'SUBMITTED' ? day.hours : 0)
            )
            .reduce((sum, val) => sum + val, 0),
        }));
      }),
      map(afterMergingResponse => {
        afterMergingResponse.sort((a, b) => {
          if (a.lastName < b.lastName) { return -1; }
          if (a.lastName > b.lastName) { return 1; }
          return 0;
        });
        afterMergingResponse.sort((a) => {
          if (a.submittedHours) { return -1; }
          return 0;
        });
        return afterMergingResponse;
      })
    );
  }

}


