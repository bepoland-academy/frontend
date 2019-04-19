import { Component, Inject, OnInit, Input } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Client, Department, Project } from '../../../core/models';
import { MatSnackBar } from '@angular/material';

export interface DialogData {
  active: boolean;
  client: Client;
  clients: Array<Client>;
  comments: string;
  department: string;
  departments: Array<Department>;
  name: string;
  projectId: string;
  rate: number;
  removable: boolean;
  roles;
  allRoles;
  usersByDepartment;
  _links: {
    DELETE: {
      href: string;
    };
    self: {
      href: string;
    };
  };
}

@Component({
  selector: 'app-project-dialog-step1',
  templateUrl: './project-dialog-step1.html',
  styleUrls: ['./project-dialog.css'],
})
export class ProjectDialogStep1 implements OnInit {
  mainForm: FormGroup;
  rates: FormArray;
  consultants: FormArray;
  onsiteOffsite = false;
  departmentSelected: string;
  step2 = false;
  step3 = false;
  rolesSaved = [];
  consultantsSaved = [];

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDialogStep1>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  ngOnInit(): void {
    this.mainForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      client: new FormControl(null, Validators.required),
      comments: new FormControl(null, Validators.required),
      department: new FormControl(this.data.department, Validators.required),
      rates: new FormArray([]),
    });
  }

  // Navigation
  selectSite(event) {
    this.onsiteOffsite = event.checked;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  goToStep2() {
    this.step2 = true;
  }

  enableStep1() {
    this.step2 = false;
  }

  enableStep3() {
    this.step2 = false;
    this.step3 = true;
  }

  enableStep2() {
    this.step3 = false;
    this.step2 = true;
  }

  // Add role to project
  roleAdded(role) {
    this.addRoleToForm(role);
    this.addRoleToList(role);
  }

  addRoleToForm(role): void {
    this.rates = this.mainForm.get('rates') as FormArray;
    const isRolePresent = this.rates.value.some(el => role.role === el.role);

    if (isRolePresent) {
      this.rates
        .at(this.rates.value.findIndex(el => el.role === role.role))
        .get('rate')
        .setValue(role.rate);
      this.rates
        .at(this.rates.value.findIndex(el => el.role === role.role))
        .get('onSiteRate')
        .setValue(role.onSiteRate);
    } else {
      this.rates.push(this.createRole(role));
    }
  }

  createRole(role): FormGroup {
    return new FormGroup({
      role: new FormControl(role.role),
      rate: new FormControl(role.rate),
      onSiteRate: new FormControl(role.onSiteRate),
      consultants: new FormArray([]),
    });
  }

  addRoleToList(role) {
    const isRolePresent = this.rolesSaved.some(el => role.role === el.role);
    if (isRolePresent) {
      this.rolesSaved = this.rolesSaved.map(el =>
        role.role === el.role ? role : el
      );
      return this.rolesSaved;
    } else {
      const newRole = {
        ...role,
      };
      this.rolesSaved.push(newRole);
      return this.rolesSaved;
    }
  }

  roleDeleted(role) {
    // Remove role from Form
    this.rates.removeAt(
      this.rates.value.findIndex(el => el.role === role.role)
    );

    // Remove role from the list of saved roles
    this.rolesSaved = this.rolesSaved.filter(el => el.role !== role.role);
    const roleRestored = { name: role.role };
    this.data.roles = this.data.roles.concat(roleRestored);
    this.data.roles.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }


  // Assign consultant to a project
  consultantAdded(consultant) {
    this.addConsultantToForm(consultant);
    this.addConsultantToList(consultant);
  }

  addConsultantToForm(consultant): void {
    this.rates = this.mainForm.get('rates') as FormArray;

    for (let i = 0; i < this.rates.length; i++) {
      if (this.rates.at(i).get('consultants').value.some(
        el => consultant.consultant === el)) {
        this.rates.at(i).get('consultants').value
          .splice(this.rates.at(i).get('consultants').value.findIndex(el => el === consultant.consultant), 1);
      }
    }

    this.rates.at(this.rates.value.findIndex(el => el.role === consultant.role))
      .get('consultants').value.push(consultant.consultant);
  }

  addConsultantToList(consultant) {
    const isConsultantPresent = this.consultantsSaved.some(
      el => consultant.consultant === el.consultant
    );
    if (isConsultantPresent) {
      this.consultantsSaved = this.consultantsSaved.map(el =>
        consultant.consultant === el.consultant ? consultant : el
      );
      return this.consultantsSaved;
    } else {
      const newConsultant = {
        ...consultant,
      };
      this.consultantsSaved.push(newConsultant);
      return this.consultantsSaved;
    }
  }

  consultantDeleted(consultant) {
    // Remove consultant from Form
    this.consultants = this.rates
      .at(this.rates.value.findIndex(el => el.role === consultant.role))
      .get('consultants') as FormArray;

    this.consultants.value.splice(this.consultants.value.findIndex(el => el === consultant.consultant), 1);

    // Remove consultant from the list of saved consultants
    this.consultantsSaved = this.consultantsSaved.filter(
      el => el.consultant !== consultant.consultant
    );
    const consultantRestored = { name: consultant.consultant };
    this.data.usersByDepartment = this.data.usersByDepartment.concat(
      consultantRestored
    );
    this.data.usersByDepartment.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  createProject() {
    this.dialogRef.close();
    console.log(this.mainForm);
  }
}
