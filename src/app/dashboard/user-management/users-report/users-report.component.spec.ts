import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReportComponent } from './users-report.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { UserManagementService } from '../user-management.service';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';


describe('UsersReportComponent', () => {
  let component: UsersReportComponent;
  let fixture: ComponentFixture<UsersReportComponent>;
  let UserManagementTest;
  let getUsersDataSpy;


  beforeEach(async(() => {
    // UserManagementTest = jasmine.createSpyObj('UserManagementService', ['getUsers']);
    TestBed.configureTestingModule({
      declarations: [ UsersReportComponent ],
      imports: [
        CustomMaterialModule,
        HttpClientModule
      ],
      providers: [
        UserManagementService
        // {provide: UserManagementService, useValue: UserManagementTest}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersReportComponent);
    component = fixture.componentInstance;
    // getUsersDataSpy = UserManagementTest.getUsers.and.returnValue(new Observable());
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsersData on ngOnInit', () => {
    spyOn(component, 'getUsersData');
    fixture.detectChanges();
    expect(component.getUsersData).toHaveBeenCalled();
  });
});
