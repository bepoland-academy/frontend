// import { async, ComponentFixture, TestBed, fakeAsync, tick, flush } from '@angular/core/testing';
// import { DebugElement } from '@angular/core';
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule, NgForm } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { By } from '@angular/platform-browser';
// import { of } from 'rxjs';
// import { cold, getTestScheduler } from 'jasmine-marbles';

// import { UserRegistrationComponent } from './user-registration.component';
// import { CustomMaterialModule } from 'src/app/material/material.module';
// import { UserManagementService } from '../user-management.service';

// const testUser: NgForm['value'] = {
//   department: 'testDepartment',
//   username: 'test12@test.com',
//   firstName: 'Testname',
//   lastName: 'Testlastname',
//   roles: ['TEST'],
// };



// describe('UserRegistrationComponent', () => {
//   let component: UserRegistrationComponent;
//   let fixture: ComponentFixture<UserRegistrationComponent>;
//   let service: UserManagementService;

//   beforeEach(async(() => {

//     TestBed.configureTestingModule({
//       declarations: [UserRegistrationComponent],
//       imports: [
//         CustomMaterialModule,
//         FormsModule,
//         HttpClientModule,
//         BrowserAnimationsModule,
//       ],
//       providers: [
//         {
//           provide: UserManagementService,
//           useValue: { postData: () => of(), changeReloadStatus() { } },
//         },
//       ],
//     })
//       .compileComponents()
//       .then(() => {

//         fixture = TestBed.createComponent(UserRegistrationComponent);
//         component = fixture.componentInstance;
//         service = TestBed.get(UserManagementService);
//         fixture.detectChanges();
//       });
//   }));

//   it('should be defined', () => {
//     expect(component).toBeDefined();
//   });

//   it('should call onSubmit method when submitting form', fakeAsync(() => {
//     spyOn(component, 'onSubmit');
//     const form: DebugElement = fixture.debugElement.query(By.css('.registration-form'));
//     form.triggerEventHandler('submit', null);
//     fixture.detectChanges();
//     expect(component.onSubmit).toHaveBeenCalled();
//   }));

//   it('should not call postData from service when values are empty', fakeAsync(() => {
//     spyOn(service, 'postData');
//     fixture.whenStable().then(() => {
//       component.onSubmit();
//       fixture.detectChanges();
//       expect(service.postData).not.toHaveBeenCalled();
//     });
//   }));


//   it('should call postData from service when values are defined', fakeAsync(() => {
//     const returnedObs = cold('---x|', '');
//     component.registrationForm.setValue(testUser);
//     fixture.detectChanges();
//     spyOn(service, 'postData').and.returnValue(returnedObs);
//     spyOn(service, 'changeReloadStatus');
//     fixture.detectChanges();
//     component.onSubmit();

//     expect(service.postData).toHaveBeenCalledWith({ ...testUser, active: true });
//     expect(component.isLoading).toBeTruthy();
//     expect(component.isFail).toBeFalsy();
//     expect(component.isSuccess).toBeFalsy();

//     getTestScheduler().flush();
//     fixture.detectChanges();
//     expect(component.isFail).toBeFalsy();
//     expect(component.isLoading).toBeFalsy();
//     expect(component.isSuccess).toBeTruthy();
//     expect(service.changeReloadStatus).toHaveBeenCalled();

//     tick(3000);
//     fixture.detectChanges();
//     expect(component.isSuccess).toBeFalsy();

//     flush();
//   }));

//   it('should call error when postData fails ', fakeAsync(() => {
//     const returnedObs = cold('---#|', null, { error: { message: 'USER ALREADY EXISTS'}});
//     component.registrationForm.setValue(testUser);
//     fixture.detectChanges();
//     spyOn(service, 'postData').and.returnValue(returnedObs);
//     fixture.detectChanges();
//     component.onSubmit();

//     expect(service.postData).toHaveBeenCalledWith({ ...testUser, active: true });
//     expect(component.isLoading).toBeTruthy();
//     expect(component.isFail).toBeFalsy();
//     expect(component.isSuccess).toBeFalsy();
//     expect(component.errorMessage).toBeFalsy();

//     getTestScheduler().flush();
//     fixture.detectChanges();

//     expect(component.isFail).toBeTruthy();
//     expect(component.isLoading).toBeFalsy();
//     expect(component.isSuccess).toBeFalsy();
//     expect(component.errorMessage).toBe('User with this email already exists');

//     tick(3000);
//     expect(component.isFail).toBeFalsy();

//     flush();
//   }));


// });
