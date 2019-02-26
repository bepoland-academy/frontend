import { TestBed, async } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoginModule } from './login/login.module';
import { NavigationModule } from './navigation/navigation.module';
import { CustomMaterialModule } from './material/material.module';
import { UserManagementModule } from './user-management/user-management.module';
import { UsersReportModule } from './user-management/users-report/users-report.module';
import { UserRegistrationModule } from './user-management/user-registration/user-registration.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { rootModule } from './app.routing';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [
        CommonModule,
        BrowserModule,
        LoginModule,
        FlexLayoutModule,
        NavigationModule,
        CustomMaterialModule,
        UsersReportModule,
        UserRegistrationModule,
        UserManagementModule,
        rootModule
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'beOnTime'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('beOnTime');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to beOnTime!');
  // });
});
