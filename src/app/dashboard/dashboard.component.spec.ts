import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DashboardComponent } from './dashboard.component';
import { ReportsComponent } from './reports.component';
import { NoRoleComponent } from './no-role.component';
import { UserManagementModule } from './user-management/user-management.module';
import { NavigationModule } from './navigation/navigation.module';
import { NavigationService } from '../core/services/navigation.service';
import { of } from 'rxjs';
import { TimeEntryComponent } from './time-entry/time-entry.component';
import { HistoricalDataComponent } from './historical-data/historical-data.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { TimeApprovalComponent } from './time-approval/time-approval.component';
import { AuthService } from '../core/services/auth.service';
import { HttpService } from '../core/services/http.service';
import { ClientManagementComponent } from './client-management/client-management.component';
import { RoleManagementComponent } from './role-management/role-management.component';
import { TimeEntryModule } from './time-entry/time-entry.module';

fdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
        HistoricalDataComponent,
        ReportsComponent,
        ProjectManagementComponent,
        TimeApprovalComponent,
        NoRoleComponent,
        ClientManagementComponent,
        RoleManagementComponent,
       ],
       imports: [
         RouterTestingModule,
         UserManagementModule,
         NavigationModule,
         HttpClientTestingModule,
         TimeEntryModule,
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
