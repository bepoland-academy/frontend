import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { User, DepartmentsResponse } from '../../core/models';
import { UsersResponse } from 'src/app/core/models/user.model';

@Injectable()
export class UserManagementService {

  endpoint = 'users';

  private reloadStatus = new BehaviorSubject<null>(null);

  constructor(private httpService: HttpService) {}

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  postData(userRegistrationData: User): Observable<null> {
    return this.httpService.post(this.endpoint, userRegistrationData);
  }

  getUsers(): Observable<UsersResponse> {
    return this.httpService.get(this.endpoint);
  }

  getDepartments(): Observable<DepartmentsResponse> {
    return this.httpService.get('departments');
  }

  updateUsers(user: User): Observable<null> {
    return this.httpService.put(user._links.self.href, user);
  }
}
