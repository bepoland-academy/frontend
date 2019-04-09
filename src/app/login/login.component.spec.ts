import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { AuthService } from '../core/services/auth.service';
import { LoginComponent } from './login.component';
import { rootModule } from '../app.routing';
import { CustomMaterialModule } from '../shared/material/material.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture < LoginComponent > ;
  let service: AuthService;

  beforeEach(async (() => {
    const authServiceSpy = {
      login() {},
      loggedIn: of(false),
    };
    TestBed.configureTestingModule({
     declarations: [LoginComponent],
     imports: [
      CustomMaterialModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      rootModule,
     ],
     providers: [
       {provide: AuthService, useValue: authServiceSpy},
     ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should be defined', () => {
   expect(component).toBeDefined();
  });

 });
