import { Component, ViewChild, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../user-management.service';
import { NgForm } from '@angular/forms';
import { User, Department, DepartmentsResponse } from '../../../core/models';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
})
export class UserRegistrationComponent implements OnInit {

  @ViewChild('myForm') registrationForm: NgForm;
  isLoading = false;
  isSuccess = false;
  isFail = false;
  errorMessage: string;
  @Input() departments: Array<Department>;

  constructor(
    private userManagementService: UserManagementService,
    private changeDetectorRefs: ChangeDetectorRef
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    if (!this.registrationForm.valid) {
      return;
    }
    this.isLoading = true;
    const value: User = this.registrationForm.value;
    if (!Array.isArray(value.roles)) {
      value.roles = [];
    }
    this.userManagementService.postData(value).subscribe(
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
        if (error.status === 409) {
          if (error.error.message === 'USER ALREADY EXISTS') {
            this.errorMessage = 'Please check your username(email) or password';
          }
        } else if ((/^[5]/g).test(error.status)) {
          this.errorMessage = `Oh no! Something bad happened.
          Please come back later when we fixed that problem. Thanks`;
        } else {
          this.errorMessage = 'Please check your Internet connection';
        }
        setTimeout(() => {
          this.isFail = false;
          this.changeDetectorRefs.detectChanges();
        }, 3000);
      }
    );
  }
}
