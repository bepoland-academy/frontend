import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { HttpService } from '../../core/services/http.service';
import { map, flatMap } from 'rxjs/operators';

@Injectable()
export class RoleManagementService {

  removable = '';

  private reloadStatus = new BehaviorSubject<null>(null);

  constructor(private httpService: HttpService) {}

  changeReloadStatus() {
    this.reloadStatus.next(null);
  }

  getReloadStatus(): Observable<null> {
    return this.reloadStatus.asObservable();
  }

  getRoles(): Observable<null> {
    return this.httpService.get('projects/roles/all');
  }

  // getRoles(): Observable<any> {
  //   return this.httpService.get('projects/roles/all').pipe(
  //     map((response) => response._embedded.roleBodyList),
  //     flatMap((res) => {
  //       return forkJoin(
  //         res.map((role: any) => {
  //           return this.isRemovable(role.roleId).pipe(
  //             map(removableRes => {
  //               return { ...role, removable: !removableRes };
  //             })
  //           );
  //         })
  //       );
  //     })
  //   );
  // }

  // isRemovable(projectId: string) {
  //   return this.httpService.get(`${this.removable}${projectId}`);
  // }

  createRole(roleRegistrationData: string): Observable<null> {
    return this.httpService.post('projects/roles/', roleRegistrationData);
  }

  updateRole(role: any): Observable<null> {
    return this.httpService.put(role._links.self.href, role);
  }

  deleteRole(role: any): Observable<null> {
    return this.httpService.delete(`http://beontime.be-academy.pl/gateway/projects/roles/${role.roleId}`);
  }
}
