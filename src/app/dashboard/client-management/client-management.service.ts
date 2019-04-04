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

  getClients(): Observable<any> {
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
    return this.httpService.fakePost('http://localhost:3000/clients', clientRegistrationData);
  }

  // createClient(clientRegistrationData: string): Observable<null> {
  //   return this.httpService.post(this.endpoint, userRegistrationData);
  // }

  // updateClient(client: any): Observable<null> {
  //   return this.httpService.put(client._links.self.href, client);
  // }

  updateClient(client: any): Observable<null> {
    return this.httpService.put(`http://localhost:3000/clients/${client.id}`, client);
  }

  deleteClient(client: any): Observable<null> {
    return this.httpService.fakeDelete(`http://localhost:3000/clients/${client.id}`);
  }
}
