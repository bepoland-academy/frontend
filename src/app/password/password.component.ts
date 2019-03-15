import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css'],
})

export class PasswordComponent implements OnInit {

  setPasswordForm: FormGroup;
  password: {newPassword: '', confirmPassword: ''};

  guideIsVisible = false;
  lowerCase = false;
  upperCase = false;
  digit = false;
  special = false;
  length = false;
  isLoading = false;
  isMatch = true;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router
  ) {}


  ngOnInit() {
    this.setPasswordForm = new FormGroup({
      newPassword: new FormControl(null, [Validators.required, this.regexValidation.bind(this)]),
      confirmPassword: new FormControl(null, Validators.required),
    }, this.passwordsMatch.bind(this));
    }

  regexValidation(control: FormControl): {[s: string]: boolean} {
    const lowerCase = /[a-z]/g;
    const upperCase = /[A-Z]/g;
    const digit = /[0-9]/g;
    const special = /[!$#%]/g;

    if (!control.pristine && control.value.match(lowerCase)) {
          this.lowerCase = true;
        } else {
          this.lowerCase = false;
        }
    if (!control.pristine && control.value.match(upperCase)) {
          this.upperCase = true;
        }  else {
          this.upperCase = false;
        }
    if (!control.pristine && control.value.match(digit)) {
          this.digit = true;
        }  else {
          this.digit = false;
        }
    if (!control.pristine && control.value.match(special)) {
          this.special = true;
        }  else {
          this.special = false;
        }
    if (!control.pristine && control.value.length > 5) {
          this.length = true;
        }  else {
          this.length = false;
        }

    const regex = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!$#%])(?=.{6,})');
    if (!regex.test(control.value)) {
      return {'doesn\'t meet Regex': true};
    } else {
      return null;
    }
  }

  passwordsMatch(form: FormGroup): {[s: string]: boolean} {
    if (form.pristine) {
      return;
    } else {
      const pass1 = this.setPasswordForm.get('newPassword').value;
      const pass2 = this.setPasswordForm.get('confirmPassword').value;

      if (pass1 !== pass2) {
        this.isMatch = false;
        return {'passwords do not match': true};
      } else {
        this.isMatch = true;
        return null;
      }
    }

  }


sendPassword() {
  this.password = {
    newPassword: this.setPasswordForm.get('newPassword').value,
    confirmPassword: this.setPasswordForm.get('confirmPassword').value,
  };
  this.router.navigate(['/login']);
}

}
