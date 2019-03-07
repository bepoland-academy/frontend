import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordComponent } from './password.component';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CustomMaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';



fdescribe('PasswordComponent', () => {
  let component: PasswordComponent;
  let fixture: ComponentFixture<PasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordComponent ],
      imports: [
        FormsModule,
        CustomMaterialModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be defibed', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when the component is initialized', () => {
    fixture.whenStable().then( () => {
      expect(component.passForm.valid).toBe(false);
   })
  });

  it(': input "keyup" should call checkPassword function', () => {
    fixture.whenStable().then( () => {
      const input = fixture.debugElement.query(By.css('input'));
      spyOn(component, 'checkPassword');
      input.triggerEventHandler('keyup', null);
      expect(component.checkPassword).toHaveBeenCalled();
   })
  });

  it(`form should be valid when both password inputs are not empty 
      and newPassword input meets Regex expression`, () => {
   fixture.whenStable().then(() => {
    component.passForm.setValue({
      password1: '123qW$',
      password2: '123qW!'
    });

    expect(component.passForm.valid).toBe(true);

    // check if 'Confirm' button is disabled when passwors don't match
    // component.checkPassword();
    expect(component.confirmButton.nativeElement.disabled).toBe(false);
    // expect(component.snackBar.open.call.count()).toEqual(1);
    // console.log(component.snackBar.open.call(1));
    // expect(component.snackBar.).toBe(true);

    console.log(2, component.passForm.value);  
    console.log(3, component.confirmButton.nativeElement.disabled);
    
    // check if sendPassword function is called on ngSubmit
    // const form = fixture.debugElement.query(By.css('form'));
    // spyOn(component, 'sendPassword');
    // form.triggerEventHandler('ngSubmit', null);
    // expect(component.sendPassword).toHaveBeenCalled();
    // console.log(form, component.passForm);
  })
   });


});
