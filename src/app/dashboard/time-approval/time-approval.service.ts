import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { User, UsersResponse, UserTimeMonthly } from '../../core/models';

@Injectable()
export class TimeApprovalService {

  endpoint = 'users';
  usersTime: Array<UserTimeMonthly> = [];
  monthNumber = '2019-03';
  // monthNumber = '1';

  constructor(private httpService: HttpService) {}


  department = JSON.parse(localStorage.getItem('user')).department;

  async getUsersTime() {
    const usersResponse = await this.getUsers(this.department).toPromise();
    const usersByDepartment: Array<User> = usersResponse._embedded.userBodyList;

    await usersByDepartment.map(async (user: User) => {
      const request = await this.getUserTime(this.department, user.userId, this.monthNumber).toPromise();
      if (request) {
        this.usersTime.push({...request, firstName: user.firstName, lastName: user.lastName});
      }
    });
    return this.usersTime;
  }

  getUsers(department: string): Observable<UsersResponse> {
    return this.httpService.get(`http://beontime.be-academy.pl/gateway/users?department=${department}`);
  }

    // getUsers(department): Observable<UsersResponse> {
  //   return this.httpService.get(this.endpoint + `?department=${department}`);
  // }

  getUserTime(department: string, consultantId: string, monthNumber: string): Observable<UserTimeMonthly> {
    return this.httpService.get(
      `http://beontime.be-academy.pl/gateway/managers/${department}/consultants/${consultantId}/months/${monthNumber}`);
  }

  // getUserTime(department: string, consultantId: string, monthNumber: string): Observable<UserTimeMonthly> {
  //   return this.httpService.get(
  //     `http://localhost:3000/managers-${department}-consultants-${consultantId}-month-${monthNumber}`);
  // }
}


