import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {

  guideVisible = false;
  lowerCase = false;
  upperCase = false;
  number = false;
  special = false;
  length = false;
  isLoading = false;

  @ViewChild('passForm') passForm: NgForm;
  

  @ViewChild('confirmButton', {read: ElementRef}) 
  public confirmButton: ElementRef

  constructor(public snackBar: MatSnackBar) {}

  showGuide() {
    this.guideVisible = true;
  }
  
  hideGuide() {
    this.guideVisible = false;
  }

checkPassword() {
  console.log(this.passForm)
  const lowerCase = /[a-z]/g;
  const upperCase = /[A-Z]/g;
  const number = /[0-9]/g;
  const special = /[!$#%]/g;

  let pass1 = this.passForm.value.password1;
  let pass2 = this.passForm.value.password2;


  if (pass1.match(lowerCase)) {
    this.lowerCase = true;
  } else {
    this.lowerCase = false;
  }
  if (pass1.match(upperCase)) {
    this.upperCase = true;
  }  else {
    this.upperCase = false;
  }
  if (pass1.match(number)) {
    this.number = true;
  }  else {
    this.number = false;
  }
  if (pass1.match(special)) {
    this.special = true;
  }  else {
    this.special = false;
  }
  if (pass1.length > 5) {
    this.length = true;
  }  else {
    this.length = false;
  }


  if (pass1 !== pass2) {
    this.confirmButton.nativeElement.disabled = true;   
    this.snackBar.open('Passwords do not match!');
  } else {
    this.snackBar.dismiss();
  }
}

sendPassword() {
  let password = {
    newPassword: this.passForm.value.password1,
    confirmPassword: this.passForm.value.password2
  }
  console.log(password);
}

}
