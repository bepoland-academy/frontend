import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { CustomMaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { rootModule } from './password.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { By } from '@angular/platform-browser';



fdescribe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordComponent ],
      imports: [
        CommonModule,
        rootModule,
        FlexLayoutModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: FormBuilder,
          useValue: formBuilder },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it(': form invalid when empty', () => {
    expect(component.setPasswordForm.valid).toBeFalsy();
  });

  it(': input fields invalid when empty', () => {
    const newPassword = component.setPasswordForm.controls.newPassword;
    const confirmPassword = component.setPasswordForm.controls.confirmPassword;
    expect(newPassword.valid).toBeFalsy();
    expect(confirmPassword.valid).toBeFalsy();

    newPassword.setValue('');
    confirmPassword.setValue('123qW*');
    expect(newPassword.valid).toBeFalsy();
    expect(newPassword.errors.required).toBeTruthy();
    expect(confirmPassword.valid).toBeTruthy();

    newPassword.setValue('123qW');
    expect(newPassword.errors.required).toBeFalsy();
    component.setPasswordForm.controls.newPassword.markAsDirty();
  });

  it(': "newPassword" input field Regex validity', () => {
    expect(component.lowerCase).toBeFalsy();
    expect(component.upperCase).toBeFalsy();
    expect(component.digit).toBeFalsy();
    expect(component.special).toBeFalsy();
    expect(component.length).toBeFalsy();

    let control = new FormControl('123qW');
    const result = component.regexValidation(control);
    control.markAsDirty();
    expect(component.regexValidation(control)).toEqual({'doesn\'t meet Regex': true});
    // console.log(result);
    expect(component.lowerCase).toBeTruthy();
    expect(component.upperCase).toBeTruthy();
    expect(component.digit).toBeTruthy();
    expect(component.special).toBeFalsy();
    expect(component.length).toBeFalsy();

    control = new FormControl('123qW!');
    const newResult = component.regexValidation(new FormControl('123qW!'));
    control.markAsDirty();
    expect(component.regexValidation(control)).toBeNull();
    expect(component.lowerCase).toBeTruthy();
    expect(component.upperCase).toBeTruthy();
    expect(component.digit).toBeTruthy();
    expect(component.special).toBeTruthy();
    expect(component.length).toBeTruthy();
    // console.log(newResult);
  });

  it(': passwords match validity', () => {
    expect(component.isMatch).toBeTruthy();
    console.log(component.isMatch);

    const newPassword = component.setPasswordForm.controls.newPassword;
    const confirmPassword = component.setPasswordForm.controls.confirmPassword;
    newPassword.setValue('');
    confirmPassword.setValue('123qW*');
    component.setPasswordForm.markAsDirty();
    expect(component.passwordsMatch(component.setPasswordForm)).toEqual({'passwords do not match': true});
    expect(component.isMatch).toBeFalsy();
    console.log(component.isMatch);

    const result = component.passwordsMatch(component.setPasswordForm);
    console.log(result);


    newPassword.setValue('123qW*');
    expect(component.passwordsMatch(component.setPasswordForm)).toBeNull();
    const newResult = component.passwordsMatch(component.setPasswordForm);
    console.log(newResult);
  });

  it(': "Confirm" button click sends new password grabbed from the setPasswordForm', () => {
    expect(component.setPasswordForm.valid).toBeFalsy();
    const testPassword = {newPassword: '123qW!', confirmPassword: '123qW!'};
    component.setPasswordForm.controls.newPassword.setValue('123qW!');
    component.setPasswordForm.controls.confirmPassword.setValue('123qW!');

    component.sendPassword();
    expect(component.password).toEqual(testPassword);
  });

  });
