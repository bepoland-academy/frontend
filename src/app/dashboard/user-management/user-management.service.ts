import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpService } from '../../services/http.service';
import { User } from '../../models';

@Injectable()
export class UserManagementService {

  endpoint = 'users';

  private reloadStatus = new BehaviorSubject<null>(null);

  constructor(private httpService: HttpService) { }

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  postData(userRegistrationData: User): Observable<any> {
    return this.httpService.post(this.endpoint, userRegistrationData);
  }

  getUsers(): Observable<any> {
    return this.httpService.get(this.endpoint);
  }

  updateUsers(user: any): Observable<any> {
    return this.httpService.put(user._links.self.href, user);
  }
}
