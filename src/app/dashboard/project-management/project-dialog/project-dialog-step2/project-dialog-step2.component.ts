import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Role } from 'src/app/core/models';
import { ProjectRole } from '../project-dialog.model';

@Component({
  selector: 'app-project-dialog-step2',
  templateUrl: './project-dialog-step2.component.html',
  styleUrls: ['../project-dialog.component.css'],
})
export class ProjectDialogStep2Component implements OnInit {


  constructor() { }
  @Input() allRoles: Array<Role>;
  @Output() changeStep: EventEmitter<string> = new EventEmitter();
  @Input() onsiteOffsite;
  @Output() ratesFormUpdated: EventEmitter<any> = new EventEmitter();

  ratesForm: FormGroup;
  @Input() roles: Array<Role>;
  @Input() rolesSaved: Array<ProjectRole>;
  currentRole: ProjectRole;
  @Output() rolesUpdated: EventEmitter<any> = new EventEmitter();
  @Output() rolesListUpdated: EventEmitter<any> = new EventEmitter();

  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;


  ngOnInit() {
    if(!this.roles.length) {
      this.roles = this.allRoles;
    }
    this.createRatesForm();
  }

  createRatesForm() {
    this.ratesForm = new FormGroup({
      role: new FormControl(null),
      rate: new FormControl(null),
      onSiteRate: new FormControl(null),
    },
    this.inputValidation.bind(this)
    );
  }

  inputValidation(): { [s: string]: boolean } {
    if (this.ratesForm) {
      const role = this.ratesForm.get('role').value;
      const rate = this.ratesForm.get('rate').value;
      const onSiteRate = this.ratesForm.get('onSiteRate').value;

      if (this.onsiteOffsite === true) {
        if (role && rate && onSiteRate) {
          return null;
        } else {
          return { 'all fields must be filled in': true };
        }
      } else {
        if (role && rate) {
          return null;
        } else {
          return { 'all fields must be filled in': true };
        }
      }
    }
  }

  createUpdateRole() {
    const isRole = this.currentRole && this.rolesSaved.some(roleSaved => roleSaved.role.roleId === this.currentRole.role.roleId);
    if (isRole) {
      const index = this.rolesSaved.findIndex(roleSaved => roleSaved.role.roleId === this.currentRole.role.roleId);
      this.rolesSaved[index] = this.ratesForm.value;
    } else {
      this.rolesSaved.push(this.ratesForm.value);
    }
    this.roles = this.roles.filter(role => role.roleId !== this.ratesForm.value.role.roleId);
    this.ratesForm.reset();
    this.currentRole = null;
  }

  editRole(role) {
    this.currentRole = role;
    this.roles.unshift(role.role);
    this.ratesForm.get('rate').setValue(role.rate);
    this.ratesForm.get('onSiteRate').setValue(role.onSiteRate);
    this.ratesForm.get('role').setValue(role.role);
  }

  deleteRole(role) {
    this.rolesSaved = this.rolesSaved.filter(el => el.role.roleId !== role.role.roleId);
    this.ratesFormUpdated.emit(this.rolesSaved);
    this.roles.push(role.role);
    this.rolesUpdated.emit(this.rolesSaved);
  }

  goToStep1() {
    this.changeStep.emit('step1');
    this.rolesUpdated.emit(this.rolesSaved);
    this.rolesListUpdated.emit(this.roles);
  }

  goToStep3() {
    this.changeStep.emit('step3');
    this.ratesFormUpdated.emit(this.rolesSaved);
    this.rolesUpdated.emit(this.rolesSaved);
    this.rolesListUpdated.emit(this.roles);
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.roleId === f2.roleId;
  }

}
