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
      consultants: new FormArray([]),
    });
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
  roleCreated(rate) {
    this.addRate(rate);
  }

  addRate(rate): void {
    this.rates = this.mainForm.get('rates') as FormArray;
    const isRatePresent = this.rates.value.some(el => rate.role === el.role);
    if (isRatePresent) {
      this.rates
        .at(this.rates.value.findIndex(el => el.role === rate.role))
        .setValue(rate);
    } else {
      this.rates.push(this.createRate(rate));
    }
  }

  createRate(rate): FormGroup {
    return new FormGroup({
      role: new FormControl(rate.role),
      rate: new FormControl(rate.rate),
      onSiteRate: new FormControl(rate.onSiteRate),
    });
  }

  roleDeleted(role) {
    this.rates.removeAt(this.rates.value.findIndex(el => el.role === role.role));
  }

  roleAdded(role) {
    console.log(role);
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

  // Add consultant to project
  consultantCreated(consultant) {
    this.addConsultant(consultant);
  }

  addConsultant(consultant): void {
    this.consultants = this.mainForm.get('consultants') as FormArray;
    const isConsultantPresent = this.consultants.value.some(el => consultant.consultant === el.consultant);
    if (isConsultantPresent) {
      this.consultants
        .at(this.consultants.value.findIndex(el => el.consultant === consultant.role))
        .setValue(consultant);
    } else {
      this.consultants.push(this.createConsultant(consultant));
    }
  }

  createConsultant(consultant): FormGroup {
    return new FormGroup({
      consultant: new FormControl(consultant.consultant),
      role: new FormControl(consultant.role),
    });
  }

  consultantDeleted(consultant) {
    this.consultants.removeAt(this.consultants.value.findIndex(el => el.consultant === consultant.consultant));
  }

  consultantAdded(consultant) {
    const isConsultantPresent = this.consultantsSaved.some(el => consultant.consultant === el.consultant);
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


  cancel(): void {
    this.dialogRef.close();
  }

  selectSite(event) {
    this.onsiteOffsite = event.checked;
  }

  departmentChosen(event) {
    this.departmentSelected = event.value;
  }


  createProject() {
    this.dialogRef.close();
    console.log(this.mainForm);
  }
}
