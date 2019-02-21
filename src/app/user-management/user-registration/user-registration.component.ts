import { Component } from '@angular/core';
import { UserRegistrationService } from './user-registration.service';


@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css'],
  styles: ['.hidden {display: none}']
})
export class UserRegistrationComponent {

  name: string;
  surname: string;
  email: string;
  role: any;
  department: string;
  registerDisabled = 'true';
  isSubmitted = false;
  isSuccess = false;
  isFail = false;
  userRegistrationData: object;

  sendUserRegData() {
    this.userRegistrationData = {
     name: this.name,
     surname: this.surname,
     email: this.email,
     role: this.role,
     department: this.department
    }
    this.isSubmitted = true;
    this.userRegistrationService.postData(this.userRegistrationData)
    .subscribe(data => {
      this.isSubmitted = false;
      this.isSuccess = true;
    },
    error => {
      this.isSubmitted = false;
      this.isFail = true;
    })
  }

  constructor(private userRegistrationService: UserRegistrationService) {
  }

  login() {
    this.sendUserRegData();
  }


}
