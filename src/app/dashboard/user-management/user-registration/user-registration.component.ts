import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent {
  @ViewChild('myForm') registrationForm: NgForm;
  active = true;
  isLoading = false;
  isSuccess = false;
  isFail = false;
  errorMessage: string;

  constructor(
    private userManagementService: UserManagementService,
    private changeDetectorRefs: ChangeDetectorRef
  ) { }

  onSubmit() {
    this.isLoading = true;
    const { value }: NgForm['value'] = this.registrationForm;
    value.active = true;
    if (!Array.isArray(value.roles)) {
      value.roles = [];
    }
    this.userManagementService.postData(value)
      .subscribe(
        () => {
          this.isLoading = false;
          this.isSuccess = true;
          this.userManagementService.changeReloadStatus();
          setTimeout(() => {
            this.isSuccess = false;
            this.changeDetectorRefs.detectChanges();
          }, 3000);
          this.registrationForm.resetForm();
        },
        error => {
          this.isLoading = false;
          this.isFail = true;
          if (error.error.message === '[emailLogin: must be a well-formed email address]') {
            this.errorMessage = 'Please enter email address in a valid format';
          } else if (error.error.message === 'USER ALREADY EXISTS') {
            this.errorMessage = 'User with this email already exists';
          } else if (error.status === 0) {
            this.errorMessage = 'There were problems with the server connection';
          }
          setTimeout(() => {
            this.isFail = false;
            this.changeDetectorRefs.detectChanges();
          }, 3000);
        }
      );
  }
}
