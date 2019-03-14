import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UsersReportComponent } from './users-report.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { UserManagementService } from '../user-management.service';
import { of } from 'rxjs';
import { User } from '../../../models';
import { cold, getTestScheduler } from 'jasmine-marbles';

describe('UsersReportComponent', () => {
  let component: UsersReportComponent;
  let fixture: ComponentFixture < UsersReportComponent > ;
  let service: UserManagementService;
  let fakeUsers: Array<User>;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
     declarations: [UsersReportComponent],
     imports: [
      CustomMaterialModule,
      HttpClientModule,
     ],
     providers: [
      {
        provide: UserManagementService,
        useValue: {
          getReloadStatus() { return of(); },
          getUsers() {return of(); },
          updateUsers() {},
          changeReloadStatus() {},
        },
      },
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fakeUsers = [
      {
        active: true,
        department: 'testDepartment',
        username: 'testmail@test.com',
        firstName: 'Nametest',
        lastName: 'Lastname',
        roles: ['CONSULTANT'],
        userId: 1254,
      },
      {
        active: true,
        department: 'userDepartment',
        username: 'testmail444@test.com',
        firstName: 'TestName',
        lastName: 'Testlast',
        roles: ['CONSULTANT', 'MANAGER'],
        userId: 532,
      },
    ];
    fixture = TestBed.createComponent(UsersReportComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserManagementService);
    const fakeUsersObservable = cold('---x|', { x: fakeUsers });
    spyOn(service, 'getUsers').and.returnValue(fakeUsersObservable);
    fixture.detectChanges();
  });


  it('should be defined', () => {
    expect(component).toBeDefined();
   });

  it('should subscribe to userManagementService.getReloadStatus method', () => {
    const returnedObs = cold('--x--', undefined);
    spyOn(service, 'getReloadStatus').and.returnValue(returnedObs);
    spyOn(component, 'getUsersData');

    fixture.detectChanges();
    component.ngOnInit();

    expect(component.getUsersData).not.toHaveBeenCalled();
    expect(service.getReloadStatus).toHaveBeenCalled();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(component.getUsersData).toHaveBeenCalled();
   });

  it('should call getUsersData and show users', () => {
    expect(component.isResponse).toBeFalsy();
    expect(component.users).toBeFalsy();
    expect(component.isDataAvailable).toBeFalsy();
    expect(component.dataSource).toBeFalsy();

    component.getUsersData();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(component.isResponse).toBeTruthy();
    expect(component.users).toBe(fakeUsers);
    expect(component.isDataAvailable).toBeTruthy();
    expect(component.dataSource.data).toBe(fakeUsers);
   });

  it('method checkRole should return boolean(true)', () => {
    expect(component.checkRole(fakeUsers[0], 'CONSULTANT')).toBeTruthy();
  });

  it('method updateRole should remove role if it exists in roles', () => {
    spyOn(component, 'updateUserData');
    const expectedUser: User = {
      ...fakeUsers[0],
      roles: [],
    };
    fixture.detectChanges();
    component.updateRole(fakeUsers[0], 'CONSULTANT');
    expect(component.updateUserData).toHaveBeenCalledWith(expectedUser);
  });

  it('method updateRole should add role if it do not exists in roles', () => {
    spyOn(component, 'updateUserData');
    const expectedUser: User = {
      ...fakeUsers[0],
      roles: ['CONSULTANT', 'MANAGER'],
    };
    fixture.detectChanges();
    component.updateRole(fakeUsers[0], 'MANAGER');
    expect(component.updateUserData).toHaveBeenCalledWith(expectedUser);
  });

  it('method updateActive should set opposite active status of user and call updateUserData', () => {
    spyOn(component, 'updateUserData');
    const expectedUser: User = {
      ...fakeUsers[0],
      active: false,
    };
    fixture.detectChanges();
    component.updateActive(fakeUsers[0]);
    expect(component.updateUserData).toHaveBeenCalledWith(expectedUser);
  });

  it('method updateUserData should call userManagementService with user as param', () => {
    const returnObs = cold('--x|');
    spyOn(service, 'updateUsers').and.returnValue(returnObs);
    spyOn(service, 'changeReloadStatus');
    fixture.detectChanges();

    component.updateUserData(fakeUsers[0]);
    expect(service.updateUsers).toHaveBeenCalledWith(fakeUsers[0]);

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(service.changeReloadStatus).toHaveBeenCalled();
  });


 });
