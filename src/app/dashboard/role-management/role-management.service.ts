import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';

@Injectable()
export class RoleManagementService {

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

  getRoles() {
    return this.httpService.fakeGet('http://localhost:3000/roles');
  }

  createRole(roleRegistrationData: string): Observable<null> {
    return this.httpService.fakePost('http://localhost:3000/roles', roleRegistrationData);
  }

  // createClient(clientRegistrationData: string): Observable<null> {
  //   return this.httpService.post(this.endpoint, userRegistrationData);
  // }

  // updateClient(client: any): Observable<null> {
  //   return this.httpService.put(client._links.self.href, client);
  // }

  updateRole(role: any): Observable<null> {
    return this.httpService.put(`http://localhost:3000/roles/${role.id}`, role);
  }

  deleteRole(role: any): Observable<null> {
    return this.httpService.fakeDelete(`http://localhost:3000/roles/${role.id}`);
  }
}
