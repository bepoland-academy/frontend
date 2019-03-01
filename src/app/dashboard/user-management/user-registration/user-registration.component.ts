import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { UserManagementService } from '../user-management.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
 })
 export class UserRegistrationComponent {
  @ViewChild('myForm')
  myForm: ElementRef;
 
  firstName: string;
  lastName: string;
  emailLogin: string;
  roles: Array<object>;
  department: string;
  active = true;
  isSubmitted = false;
  isSuccess = false;
  isFail = false;
  userRegistrationData: object;
  errorMessage: string;
 
  constructor(private userManagementService: UserManagementService,
    private changeDetectorRefs: ChangeDetectorRef) {}

  sendUserRegData() {
   this.userRegistrationData = {
    firstName: this.firstName,
    lastName: this.lastName,
    emailLogin: this.emailLogin,
    roles: this.roles,
    department: this.department,
    active: this.active
   };
   this.isSubmitted = true;
   this.userManagementService.postData(this.userRegistrationData)
    .subscribe(data => {
      console.log(data)
      this.isSubmitted = false;
      this.isSuccess = true;
      setTimeout(() => {
       this.isSuccess = false;
       this.changeDetectorRefs.detectChanges();
      }, 3000);
      this.myForm.nativeElement.reset();
      this.userManagementService.changeReloadStatus();
     },
     error => {
      console.log(error);
      this.isSubmitted = false;
      this.isFail = true;
      if (error.error.message == '[emailLogin: must be a well-formed email address]') {
        this.errorMessage = 'Please enter email address in a valid format';
      } else if (error.error.message == 'USER ALREADY EXISTS') {
        this.errorMessage = 'User with this email already exists';
      } else if (error.status == 0) {
        this.errorMessage = 'There were problems with the server connection';
      }
      setTimeout(() => {
       this.isFail = false;
       this.changeDetectorRefs.detectChanges();
      }, 3000);
      this.changeDetectorRefs.detectChanges();
     });
  }
 
 }
