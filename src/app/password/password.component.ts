import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../core/services/http.service';

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
  token: string;

  constructor(
    public snackBar: MatSnackBar,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private httpService: HttpService
  ) {}


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params.token;
    });
    this.setPasswordForm = new FormGroup({
      newPassword: new FormControl(null, [Validators.required, this.regexValidation.bind(this)]),
      confirmPassword: new FormControl(null, Validators.required),
    }, this.passwordsMatch.bind(this));
    }

  regexValidation(control: FormControl): {[key: string]: boolean} {
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
  const password = this.setPasswordForm.get('newPassword').value;
  this.httpService
    .changePassword('password?action=SET', { token: this.token, password })
    .subscribe(() => this.router.navigate(['/login']));

}

}
