import { Component, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { UserManagementService } from '../user-management.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styles: [`
   .hidden {display: none}
   .mat-card {width: 250px}
   .mat-spinner {margin: auto}
   `]
 })
 export class UserRegistrationComponent {
  @ViewChild('myForm')
  myForm: ElementRef;
 
 
  firstName: string;
  lastName: string;
  emailLogin: string;
  roles: any;
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
      this.errorMessage = error.error.message;
      setTimeout(() => {
       this.isFail = false;
       this.changeDetectorRefs.detectChanges();
      }, 3000);
      this.changeDetectorRefs.detectChanges();
     });
  }
 
 }
