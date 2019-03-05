import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserRegistrationComponent } from './user-registration.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture < UserRegistrationComponent > ;
  let service: UserManagementService;

  beforeEach(async (() => {
   TestBed.configureTestingModule({
     declarations: [UserRegistrationComponent],
     imports: [
      CustomMaterialModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
     ],
     providers: [
      {
        provide: UserManagementService,
        useValue: {postData: () => of(), changeReloadStatus() {}}
      }
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
   fixture = TestBed.createComponent(UserRegistrationComponent);
   component = fixture.componentInstance;
   service = TestBed.get(UserManagementService);
   fixture.detectChanges();
  });


  it('should be defined', () => {
   expect(component).toBeDefined();
  });

  it('should call sendUserAuthData when clicked on "Register" button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    spyOn(component, 'onSubmit');
    button.triggerEventHandler('click', null);
    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should call postData from UserManagementService when sendUserAuthData is called', () => {
    spyOn(service, 'postData').and.returnValue(of());
    component.onSubmit();
    console.log(service);
    expect(service.postData).toHaveBeenCalled();
   });

 });
