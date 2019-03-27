import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { User, UsersResponse, UserTimeMonthlyResponse } from '../../core/models';

@Injectable()

export class TimeApprovalService {

  endpoint = 'users?department=';

  constructor(private httpService: HttpService) { }



  async getUsersTime() {
    const department = JSON.parse(localStorage.getItem('user')).department;
    const date = new Date();
    const yearMonth = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2);
    const usersTime: Array<UserTimeMonthlyResponse> = [];

    const usersResponse = await this.getUsers(department).toPromise();
    console.log(usersResponse);

    const usersByDepartment: Array<User> = usersResponse._embedded.userBodyList;
    await usersByDepartment.map(async (user: User) => {
      const response = await this.getUserTime(department, user.userId, yearMonth).toPromise();

      if (response._embedded) {
        usersTime.push({ month:  response._embedded.monthTimeEntryBodyList, firstName: user.firstName, lastName: user.lastName });
      }
      if (response.message) {
        usersTime.push({ month: [], firstName: user.firstName, lastName: user.lastName });
      }
    });
    return usersTime;
  }

  getUsers(department: string): Observable<UsersResponse> {
    return this.httpService.get(this.endpoint + `${department}`);
  }

  getUserTime(department: string, consultantId: string, monthNumber: string): Observable<UserTimeMonthlyResponse> {
    return this.httpService.get(
      `managers/${department}/consultants/${consultantId}/months/${monthNumber}`);
  }

  // getUserTime(department: string, consultantId: string, monthNumber: string): Observable<UserTimeMonthly> {
  //   return this.httpService.get(
  //     `http://localhost:3000/managers-${department}-consultants-${consultantId}-month-${monthNumber}`);
  // }
}


