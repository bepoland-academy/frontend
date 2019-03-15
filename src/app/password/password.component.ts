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


    // if (control.pristine) {
    //   return null;
    // }

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
        // this.snackBar.open('Passwords do not match!');
        this.isMatch = false;
        return {'passwords do not match': true};
      } else {
        // this.snackBar.dismiss();
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


// import { Component, ViewChild, ElementRef, OnInit, ChangeDetectorRef } from '@angular/core';
// import { MatSnackBar } from '@angular/material';
// import { NgForm } from '@angular/forms';
// import { ComponentFixture } from '@angular/core/testing';

// @Component({
//   selector: 'app-password',
//   templateUrl: './password.component.html',
//   styleUrls: ['./password.component.css'],
// })
// export class PasswordComponent implements OnInit {

//   guideVisible = false;
//   lowerCase = false;
//   upperCase = false;
//   digit = false;
//   special = false;
//   length = false;
//   isLoading = false;

//   @ViewChild('passForm') passForm: NgForm;


//   @ViewChild('confirmButton', {read: ElementRef})
//   public confirmButton: ElementRef;

//   constructor(public snackBar: MatSnackBar,     private changeDetectorRefs: ChangeDetectorRef
//     ) {}

//   showGuide() {
//     this.guideVisible = true;
//   }

//   hideGuide() {
//     this.guideVisible = false;
//   }

// checkPassword() {
//   const lowerCase = /[a-z]/g;
//   const upperCase = /[A-Z]/g;
//   const digit = /[0-9]/g;
//   const special = /[!$#%]/g;

//   const pass1 = this.passForm.value.password1;
//   const pass2 = this.passForm.value.password2;


//   if (pass1.match(lowerCase)) {
//     this.lowerCase = true;
//   } else {
//     this.lowerCase = false;
//   }
//   if (pass1.match(upperCase)) {
//     this.upperCase = true;
//   }  else {
//     this.upperCase = false;
//   }
//   if (pass1.match(digit)) {
//     this.digit = true;
//   }  else {
//     this.digit = false;
//   }
//   if (pass1.match(special)) {
//     this.special = true;
//   }  else {
//     this.special = false;
//   }
//   if (pass1.length > 5) {
//     this.length = true;
//   }  else {
//     this.length = false;
//   }


//   if (pass1 !== pass2) {
//     this.confirmButton.nativeElement.disabled = true;
//     this.snackBar.open('Passwords do not match!');
//   } else {
//     this.confirmButton.nativeElement.disabled = false;
//     this.snackBar.dismiss();
//   }
//   console.log(pass1, pass2, (pass1 !== pass2));
// }

// sendPassword() {
//   const password = {
//     newPassword: this.passForm.value.password1,
//     confirmPassword: this.passForm.value.password2,
//   };
//   console.log(password);
// }

// ngOnInit() {
//   this.changeDetectorRefs.detectChanges();
//   // console.log(this.confirmButton,
//   //   this.confirmButton.nativeElement.disabled,
//   //    this.passForm.valid, this.passForm);
//   console.log(this.confirmButton.nativeElement.getAttribute('disabled'));
// }

// ngAfterViewInit() {
//   console.log(this.passForm.getAttribute('value'));

// }

// }
