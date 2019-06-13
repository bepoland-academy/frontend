import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { CreateProjectDialogData } from './project-dialog.model';


@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css'],
})

export class ProjectDialogComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateProjectDialogData,
    private snackBar: MatSnackBar
  ) { }

  currentStep = 'step1';
  onsiteOffsite = false;
  mainForm: FormGroup;
  rates: FormArray;
  ratesFull: Array<any>;
  roles = [];
  usersListDropdown = [];
  allUsersListFromDropdown = [];
  rolesSaved = [];
  usersAssigned = [];

  ngOnInit(): void {
    this.createNewForm();
    [...this.usersListDropdown] = this.data.usersByDepartment;
    [...this.allUsersListFromDropdown] = this.data.usersByDepartment;
  }

  handleSiteModelChoice(event) {
    this.onsiteOffsite = event;
    this.mainForm.get('offsiteOnly').setValue(!this.onsiteOffsite);
    this.mainForm.get('rates').reset();
    this.roles = [];
    [...this.usersListDropdown] = this.data.usersByDepartment;
    this.rolesSaved = [];
    this.usersAssigned = [];
  }

  createNewForm() {
    this.mainForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      clientGuid: new FormControl(null, Validators.required),
      comments: new FormControl(null),
      departmentGuid: new FormControl(this.data.department),
      offsiteOnly: new FormControl(true),
      active: new FormControl(true),
      rates: new FormArray([]),
    });
  }

  changeStep(step) {
    this.currentStep = step;
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveStep1Data(form) {
    for (const control in this.mainForm.value) {
      this.mainForm.value[control] = form[control];
    }
  }

  updateRatesInForm(roles) {
    const rates = <FormArray>this.mainForm.get('rates');
    while (rates.length !== 0) {
      rates.removeAt(0);
    }

    this.ratesFull = roles;
    if (roles.length) {
      const ratesList = roles.map(roleSaved => ({
        roleId: roleSaved.role.roleId,
        rate: roleSaved.rate,
        onSiteRate: roleSaved.onSiteRate,
        consultants: [],
      }));

      ratesList.map(newRate => {
        rates.push(new FormControl(newRate));
      })
    }

  }

  updateRolesSaved(rolesSaved) {
    this.rolesSaved = rolesSaved;
  }

  updateRolesList(rolesList) {
    this.roles = rolesList;
  }

  updateUsersAssigned(users) {
    this.usersAssigned = users;
    this.updateUsersInForm(users);
  }

  updateUsersInForm(users) {
    const rates = <FormArray>this.mainForm.get('rates');
    rates.value.map(rate => users.map(user => {
      if (rate.roleId === user.role.roleId) {
        rate.consultants.push(user.user.userId);
      }
    }));
    console.log(this.mainForm.value);
  }

  updateUsersListDropdown(usersListDropdown) {
    this.usersListDropdown = usersListDropdown;
  }

  sendForm() {
    console.log(this.mainForm.value);
  }

}
