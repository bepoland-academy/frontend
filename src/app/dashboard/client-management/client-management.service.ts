import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';

@Injectable()
export class ClientManagementService {

  // endpoint = 'users';

  private reloadStatus = new BehaviorSubject<null>(null);

  constructor(private httpService: HttpService) {}

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  // getClients(): Observable<ClientsResponse> {
  //   return this.httpService.get('departments');
  // }

  getClients() {
    return this.httpService.fakeGet('http://localhost:3000/clients');
  }

  createClient(clientRegistrationData: any): Observable<null> {
    return this.httpService.post(this.endpoint, userRegistrationData);
  }

  updateClient(client: any): Observable<null> {
    return this.httpService.put(user._links.self.href, user);
  }
}
