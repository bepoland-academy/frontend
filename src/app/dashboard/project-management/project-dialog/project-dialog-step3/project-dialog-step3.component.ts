import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/core/models';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-dialog-step3',
  templateUrl: './project-dialog-step3.component.html',
  styleUrls: ['../project-dialog.component.css'],
})
export class ProjectDialogStep3Component implements OnInit {

  constructor() { }

  usersForm: FormGroup;
  @Input() onsiteOffsite;
  @Input() usersListDropdown: Array<any>;
  @Input() allUsersListFromDropdown: Array<any>;
  @Input() usersAssigned: Array<any>;
  @Input() rolesSaved: Array<any>;
  @Output() changeStep: EventEmitter<string> = new EventEmitter();
  @Output() usersAssignedUpdated: EventEmitter<any> = new EventEmitter();
  @Output() usersListDropdownUpdated: EventEmitter<any> = new EventEmitter();
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter();



  compareRoles: ((f1: any, f2: any) => boolean) | null = this.compareRolesByValue;
  compareUsers: ((f1: any, f2: any) => boolean) | null = this.compareUsersByValue;

  ngOnInit() {
    this.createUsersForm();
  }

  createUsersForm() {
    this.usersForm = new FormGroup({
      user: new FormControl(null, Validators.required),
      role: new FormControl(null, Validators.required),
    });
  }

  createUpdateUser() {
    const { role, user: { name, userId } } = this.usersForm.value;
    const userAlreadyExists = this.usersAssigned.find(user => user.user.userId === userId);
    if (userAlreadyExists) {
      const index = this.usersAssigned.findIndex(user => user.user.userId === userId);
      this.usersAssigned[index] = { user: { name, userId }, role };
      this.updateUsersListDropdown();
    } else {
      this.usersAssigned.push({ user: { name, userId }, role });
      this.usersListDropdown = this.usersListDropdown.filter(userFromDropdown => userFromDropdown.userId !== userId);
    }
    this.usersForm.reset();
  }

  compareUsersByValue(f1: any, f2: any) {
    return f1 && f2 && f1.userId === f2.userId;
  }

  compareRolesByValue(f1: any, f2: any) {
    return f1 && f2 && f1.roleId === f2.roleId;
  }

  editUser(user) {
    [...this.usersListDropdown] = this.allUsersListFromDropdown;
    this.usersForm.get('user').setValue(user.user);
    this.usersForm.get('role').setValue(user.role);
  }

  updateUsersListDropdown() {
    this.usersAssigned.map(userAssigned => this.usersListDropdown.map(userFromList => {
      if (userAssigned.user.userId === userFromList.userId) {
        const index = this.usersListDropdown
          .findIndex(userFromList => userFromList.userId === userAssigned.user.userId);
        this.usersListDropdown.splice(index, 1);
      }
    })
    );
  }

  deleteUser(user) {
    this.usersAssigned = this.usersAssigned.filter(userAssigned => userAssigned.user.userId !== user.user.userId);

    const userPresent = this.usersListDropdown.find(userFromList => userFromList.userId === user.user.userId);
    if (!userPresent) {
      this.usersListDropdown.push({ name: user.user.name, userId: user.user.userId });
    }
    this.updateUsersListDropdown();
    this.usersForm.reset();
  }


  goToStep2() {
    this.changeStep.emit('step2');
    this.usersAssignedUpdated.emit(this.usersAssigned);
    this.usersListDropdownUpdated.emit(this.usersListDropdown);
  }

  addNewUser() {
    this.updateUsersListDropdown();
    this.usersForm.reset();
  }

  onSubmit() {
    this.usersAssignedUpdated.emit(this.usersAssigned);
    this.usersListDropdownUpdated.emit(this.usersListDropdown);
    this.formSubmitted.emit();
  }

}
