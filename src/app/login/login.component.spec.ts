import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import { CustomMaterialModule } from '../material/material.module';
import { rootModule } from '../app.routing';
import { AuthService } from '../services/auth.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture < LoginComponent > ;
  let service: AuthService;

  beforeEach(async (() => {
    const authServiceSpy = {
      login: () => {},
      loggedIn: of(false)
    };
    TestBed.configureTestingModule({
     declarations: [LoginComponent],
     imports: [
      CustomMaterialModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      rootModule
     ],
     providers: [
       {provide: AuthService, useValue: authServiceSpy}
     ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    component.username = 'test123@test.pl';
    component.password = 'test123!';
    fixture.detectChanges();
  });

  it('should be defined', () => {
   expect(component).toBeDefined();
  });

  it('simulating click on Login button', () => {
    spyOn(service, 'login').and.returnValue(of());
    const loginButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    loginButton.triggerEventHandler('click', null);
    expect(service.login).toHaveBeenCalledWith({ emailLogin: 'test123@test.pl', password: 'test123!' });
    expect(component.isLoading).toBeTruthy();
  });

 });
