import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { User, UsersResponse, UserTimeMonthly } from '../../core/models';
import { map, switchMap, mergeMap, flatMap } from 'rxjs/operators';

@Injectable()
export class TimeApprovalService {

  endpoint = 'users';
  // users: Observable<any>;
  usersByDepartment: any;

  constructor(private httpService: HttpService) {}

  // getUsers(): Observable<UsersResponse> {
  //   return this.httpService.get(this.endpoint);
  // }

  getUsers(): Observable<UsersResponse> {
    return this.httpService.get('http://beontime.be-academy.pl/gateway/users');
  }

    // const managerId = '7041cb03-200d-457c-84a9-a4881527448f';

  // getUsersTime(managerId: string, consultantId: string, monthNumber: string): Observable<UserTimeMonthly> {
  //   return this.httpService.get(
  //     `http://url.com/timeEntries/managers/${managerId}/consultants/${consultantId}/month/${monthNumber}`);
  // }

  getUsersTime(managerId: string, consultantId: string, monthNumber: string): Observable<UserTimeMonthly> {
    return this.httpService.get(
      `http://localhost:3000/managers-${managerId}-consultants-${consultantId}-month-${monthNumber}`);
  }
}


