import { Component, OnInit, Output, EventEmitter, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CreateProjectDialogData } from '../project-dialog.model';


@Component({
  selector: 'app-project-dialog-step1',
  templateUrl: './project-dialog-step1.component.html',
  styleUrls: ['../project-dialog.component.css'],
})
export class ProjectDialogStep1Component implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateProjectDialogData
    ) {}

  @Input() mainForm;
  @Input() onsiteOffsite;
  @Output() siteModelUpdated: EventEmitter<any> = new EventEmitter();
  @Output() enableStep2: EventEmitter<string> = new EventEmitter();
  @Output() closeDialog: EventEmitter<null> = new EventEmitter();
  @Output() updateStep1Form: EventEmitter<any> = new EventEmitter();

  step1Form: FormGroup;

  ngOnInit() {
    this.createStep1Form();
    const {name, clientGuid, comments, offsiteOnly, departmentGuid, active} = this.mainForm;
    this.step1Form.get('name').setValue(name);
    this.step1Form.get('clientGuid').setValue(clientGuid);
    this.step1Form.get('comments').setValue(comments);
    this.step1Form.get('offsiteOnly').setValue(offsiteOnly);
    this.step1Form.get('departmentGuid').setValue(departmentGuid);
    this.step1Form.get('active').setValue(active);
  }

  createStep1Form() {
    this.step1Form = new FormGroup({
      name: new FormControl(null, Validators.required),
      clientGuid: new FormControl(null, Validators.required),
      comments: new FormControl(null),
      offsiteOnly: new FormControl(null),
      departmentGuid: new FormControl(this.data.department),
      active: new FormControl(true),
    });
  }

  goToStep2() {
    this.step1Form.get('offsiteOnly').setValue(!this.onsiteOffsite);
    this.updateStep1Form.emit(this.step1Form.value);
    this.enableStep2.emit('step2');
  }

  cancel() {
    this.closeDialog.emit();
  }

  updateSiteModel() {
    this.onsiteOffsite = !this.onsiteOffsite;
    this.siteModelUpdated.emit(this.onsiteOffsite);
  }



}
