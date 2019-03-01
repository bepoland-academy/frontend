import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersReportComponent } from './users-report.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { UserManagementService } from '../user-management.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';


fdescribe('UsersReportComponent', () => {
  let component: UsersReportComponent;
  let fixture: ComponentFixture < UsersReportComponent > ;
  let service: UserManagementService;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
     declarations: [UsersReportComponent],
     imports: [
      CustomMaterialModule,
      HttpClientModule
     ],
     providers: [
      { 
        provide: UserManagementService,
        useValue: {
          getReloadStatus: () => of()
        }
      }
     ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
   fixture = TestBed.createComponent(UsersReportComponent);
   component = fixture.componentInstance;
   service = TestBed.get(UserManagementService);
   fixture.detectChanges();
  });


  it('should be defined', () => {
    expect(component).toBeDefined();
   });

  it('should call postData from UserManagementService when sendUserAuthData is called', () => {
    spyOn(service, 'getReloadStatus').and.returnValue(of());
    component.ngOnInit();
    expect(service.getReloadStatus).toHaveBeenCalled();
   });
 
 });
