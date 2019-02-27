import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserManagementComponent } from './user-management.component';
import { UserRegistrationModule } from './user-registration/user-registration.module';
import { UsersReportModule } from './users-report/users-report.module';
import { UserManagementService } from './user-management.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserManagementComponent', () => {
  let component: UserManagementComponent;
  let fixture: ComponentFixture < UserManagementComponent > ;
 
  beforeEach(async (() => {
   TestBed.configureTestingModule({
     declarations: [UserManagementComponent],
     imports: [
      UserRegistrationModule,
      UsersReportModule,
      HttpClientModule,
      BrowserAnimationsModule,
      HttpClientTestingModule
     ],
     providers: [
      UserManagementService
     ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
   fixture = TestBed.createComponent(UserManagementComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
  });
 
  it('should create', () => {
   expect(component).toBeTruthy();
  });
 
  it('should get user"s data', () => {
   const userData = [{
    id: 1,
    name: 'Lexie',
    surname: 'Syl',
    role: [
     'manager',
     'consultant',
     'administrator'
    ],
    active: false,
    department: 'banking'
   }];
 
   const userManagementService = TestBed.get(UserManagementService);
   const http = TestBed.get(HttpTestingController);
   let dataReceived;
 
   userManagementService.getUsers('http://localhost:3000/users/3').subscribe((response) => {
    dataReceived = response;
   });
 
   http.expectOne('http://localhost:3000/users/3').flush(userData);
   expect(dataReceived).toEqual(userData);
   console.log('response' + dataReceived[0].name + 'start' + userData[0].surname);
  });
 
 });
