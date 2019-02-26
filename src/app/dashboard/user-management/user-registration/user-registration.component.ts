import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { UserManagementService } from '../user-management.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  styles: ['.hidden {display: none}']
})
export class UserRegistrationComponent implements OnInit {
  @ViewChild('myForm')
  myForm: ElementRef;
  reloadPage: string;


  firstName: string;
  lastName: string;
  emailLogin: string;
  roles: any;
  department: string;
  active = 'YES';
  registerDisabled = 'true';
  isSubmitted = false;
  isSuccess = false;
  isFail = false;
  userRegistrationData: object;
  userRegistered = 'true';

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
      }, 3000);
      this.myForm.nativeElement.reset();
      this.userManagementService.triggerReload('true');
    },
    error => {
      this.isSubmitted = false;
      this.isFail = true;
      setTimeout(() => {
        this.isFail = false;
      }, 3000);
    });
  }

  constructor(private userManagementService: UserManagementService) {
  }

  ngOnInit() {
    this.userManagementService.notTriggerReload.subscribe(message => this.reloadPage = message);
    console.log(this.reloadPage);
  }
}
