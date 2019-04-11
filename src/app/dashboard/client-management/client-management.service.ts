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

  createClient(clientRegistrationData: string): Observable<any> {
    return this.httpService.post('clients', clientRegistrationData);
  }

  updateClient(client: Client): Observable<any> {
    return this.httpService.put(client._links.self.href, client);
  }

  deleteClient(client: Client): Observable<any> {
    return this.httpService.delete(`http://beontime.be-academy.pl/gateway/clients/${client.clientId}`);
  }
}
