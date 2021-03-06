import {
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
  Input,
  SimpleChanges,
  SimpleChange
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Client, Department, Project } from '../../../../core/models';
import { FormGroup } from '@angular/forms';

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
  roles: any;
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
  selector: 'app-project-dialog-step2',
  templateUrl: './project-dialog-step2.html',
  styleUrls: ['../project-dialog.css'],
})
export class ProjectDialogStep2 implements OnInit {
  @Input() step2;
  @Input() onsiteOffsite;
  @Input() rolesSaved;

  @Output() enableStep1 = new EventEmitter<any>();
  @Output() enableStep3 = new EventEmitter<any>();
  @Output() roleAdded = new EventEmitter<any>();
  @Output() roleDeleted = new EventEmitter<any>();

  title;
  createEditRole = false;
  roleToEdit;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDialogStep2>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  backToStep1() {
    this.enableStep1.emit();
  }

  goToStep3() {
    this.step2 = false;
    this.enableStep3.emit();
  }

  openAssignRole() {
    console.log(this.data.roles);
    console.log(this.rolesSaved);

    this.title = 'Create Role';
    this.createEditRole = true;
    this.roleToEdit = null;
  }

  openEditRole(role) {
    this.title = 'Edit role';
    this.createEditRole = true;
    this.roleToEdit = role;
  }

  roleCreated(role) {
    this.roleAdded.emit(role);
    this.createEditRole = false;
  }

  deleteRole(role) {
    this.roleDeleted.emit(role);
    this.roleToEdit = null;
    this.createEditRole = false;
  }
}
