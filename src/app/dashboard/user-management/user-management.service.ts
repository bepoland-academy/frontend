import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpService } from '../../services/http.service';
import { user } from '../../models';

@Injectable()
export class UserManagementService {

  endpoint = 'users/';

  private reloadStatus = new BehaviorSubject<boolean>(null);

  constructor(private httpService: HttpService) { }

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<boolean> {
    return this.reloadStatus.asObservable();
  }

  postData(userRegistrationData: user): Observable<any> {
    return this.httpService.post(this.endpoint, userRegistrationData);
  }

  getUsers(): Observable< Array<user> > {
    return this.httpService.get(this.endpoint);
  }

  updateUsers(user: any): Observable<any> {
    return this.httpService.put(this.endpoint + user.id, user);
  }
}
