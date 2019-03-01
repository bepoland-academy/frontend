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
 
  it('should be defined', () => {
   expect(component).toBeTruthy();
  });
 
 });
