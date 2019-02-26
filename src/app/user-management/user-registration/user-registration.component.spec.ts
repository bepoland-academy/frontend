import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UserRegistrationComponent } from './user-registration.component';
import { CustomMaterialModule } from 'src/app/material/material.module';
import { FormsModule } from '@angular/forms';
import { UserManagementService } from '../user-management.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';
import { UserManagementModule } from '../user-management.module';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;
  // let UserRegistrationTest;
  // let userManagementServiceSpy;

  beforeEach(async(() => {
    // UserRegistrationTest = jasmine.createSpyObj('UserManagementService', ['postData']);
    TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      imports: [
        CustomMaterialModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        UserManagementModule
      ],
      providers: [
        UserManagementService
        // {provide: UserManagementService,
        //  useValue: UserRegistrationTest}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    // userManagementServiceSpy = UserRegistrationTest.postData.and.returnValue(new Observable());
    fixture.detectChanges();
  });

  it('should be defined', () => {
    expect(component).toBeDefined();
  });

  // it('should call UserRegistrationTest', () => {
  //   component.sendUserRegData();
  //   expect(userManagementServiceSpy).toHaveBeenCalled();
  // });

  it('should call sendUserAuthData when clicked on button', () => {
    const button = fixture.debugElement.query(By.css('button'));
    spyOn(component, 'sendUserRegData');
    button.triggerEventHandler('click', null);
    expect(component.sendUserRegData).toHaveBeenCalled();
  });
});
