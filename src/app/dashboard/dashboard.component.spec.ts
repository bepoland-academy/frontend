import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { TimeTrackingComponent } from './time-tracking.component';
import { HistoricalDataComponent } from './historical-data.component';
import { ReportsComponent } from './reports.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { TimeApprovalComponent } from './time-approval.component';
import { NoRoleComponent } from './no-role.component';
import { UserManagementModule } from './user-management/user-management.module';
import { NavigationModule } from './navigation/navigation.module';
import { NavigationService } from '../core/services/navigation.service';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        TimeTrackingComponent,
        HistoricalDataComponent,
        ReportsComponent,
        ProjectManagmentComponent,
        TimeApprovalComponent,
        NoRoleComponent,
       ],
       imports: [
         RouterTestingModule,
         UserManagementModule,
         NavigationModule,
         HttpClientTestingModule,
       ],
       providers: [
         NavigationService,
         { provide: AuthService, useValue: { roles: ['CONSULTANT'], getUserStream() {return of(); }}},
         HttpService,
       ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
