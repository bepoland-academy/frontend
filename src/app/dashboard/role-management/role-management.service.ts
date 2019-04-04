import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpService } from '../../core/services/http.service';

@Injectable()
export class RoleManagementService {

  private reloadStatus = new BehaviorSubject<null>(null);

  constructor(private httpService: HttpService) {}

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  getRoles(): Observable<any> {
    return this.httpService.get('projects/roles/all');
  }

  createRole(roleRegistrationData: string): Observable<null> {
    return this.httpService.post('projects/roles/', roleRegistrationData);
  }

  updateRole(role: any): Observable<null> {
    return this.httpService.put(role._links.self.href, role);
  }

  deleteRole(role: any): Observable<null> {
    return this.httpService.delete(`projects/roles/${role.roleId}`);
  }
}
