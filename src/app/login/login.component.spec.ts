import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CustomMaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Observable } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture < LoginComponent > ;
  let UserLoginTest;
  let loginServiceSpy;
 
  beforeEach(async (() => {
   UserLoginTest = jasmine.createSpyObj('LoginService', ['postData']);
   TestBed.configureTestingModule({
     declarations: [LoginComponent],
     imports: [
      CustomMaterialModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule
     ],
     providers: []
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
   fixture = TestBed.createComponent(LoginComponent);
   component = fixture.componentInstance;
   loginServiceSpy = UserLoginTest.postData.and.returnValue(new Observable());
   fixture.detectChanges();
  });
 
  it('should be defined', () => {
   console.log(component)
   expect(component).toBeDefined();
  });
 
  // it('should call UserLoginTest', () => {
  //   component.sendUserAuthData();
  //   expect(loginServiceSpy).toHaveBeenCalled();
  // });
 
  // it('should call sendUserAuthData when clicked on button', () => {
  //   const button = fixture.debugElement.query(By.css('button'));
  //   spyOn(component, 'sendUserAuthData');
  //   button.triggerEventHandler('click', null);
  //   expect(component.sendUserAuthData).toHaveBeenCalled();
  // });
 });
