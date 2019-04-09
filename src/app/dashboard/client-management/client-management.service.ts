import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { Client, ClientsResponse } from '../../core/models';

@Injectable()
export class ClientManagementService {

  private reloadStatus = new BehaviorSubject<null>(null);

  constructor(private httpService: HttpService) {}

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  getClients(): Observable<ClientsResponse> {
    return this.httpService.get('clients');
  }

  // getProjects(department: string): Observable<any> {
  //   return this.httpService.get(this.projectsByDepartment + department).pipe(
  //     map((response) => response._embedded.projectBodyList),
  //     flatMap((res) => {
  //       return forkJoin(
  //         res.map(project => {
  //           return this.isRemovable(project.projectId).pipe(
  //             map(removableRes => {
  //               return {...project, removable: removableRes};
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // }

  createClient(clientRegistrationData: string): Observable<null> {
    return this.httpService.post('clients', clientRegistrationData);
  }

  updateClient(client: Client): Observable<null> {
    return this.httpService.put(client._links.self.href, client);
  }

  deleteClient(client: Client) {
    return this.httpService.delete(`clients/${client.clientId}`);
  }
}
