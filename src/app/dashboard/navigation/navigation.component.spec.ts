// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { Routes } from '@angular/router';
// import { Component } from '@angular/core';
// import { BehaviorSubject, of } from 'rxjs';

// import { NavigationComponent } from './navigation.component';
// import { CustomMaterialModule } from '../../material/material.module';
// import { rootModule } from '../../app.routing';
// import { NavigationService } from '../../core/services/navigation.service';
// import { AuthService } from '../../services/auth.service';
// import { HttpService } from '../../services/http.service';
// import { User } from '../../models';


// @Component({}) class EmptyComponent {}

// const firstComponent = EmptyComponent;
// const secondComponent = EmptyComponent;

// const user: User = {
//   userId: 1,
//   active: true,
//   department: 'bank',
//   username: 'test@test.com',
//   firstName: 'Testname',
//   lastName: 'Testlastname',
//   roles: ['testRole'],
// };

// const routes: Routes = [
//   { path: 'first', component: firstComponent, data: {name: 'First Tab'}},
//   { path: 'second', component: secondComponent, data: { name: 'Second Tab' }},
// ];

// const navigationServiceMock = {
//   getLinks: () => new BehaviorSubject(routes),
// };

// const authServiceMock = {
//   logout() {},
//   getUserStream() {return of(user); },
// };

// describe('NavigationComponent', () => {
//   let component: NavigationComponent;
//   let fixture: ComponentFixture<NavigationComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         NavigationComponent,
//       ],
//       imports: [
//         CustomMaterialModule,
//         rootModule,
//         HttpClientTestingModule,
//       ],
//       providers: [
//         { provide: NavigationService, useValue: navigationServiceMock},
//         { provide: AuthService, useValue: authServiceMock},
//         HttpService,
//       ],
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavigationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('links should be equal to routes', () => {
//     expect(component.links).toEqual(routes);
//   });

//   // it('should logout', () => {
//   //   const authService = TestBed.get(AuthService);
//   //   spyOn(authService, 'logout')
//   //   const logoutButton = fixture.debugElement.query(By.css('.logout'));
//   //   logoutButton.triggerEventHandler('click', null);
//   //   expect(authService.logout).toHaveBeenCalled()
//   // });

// });
