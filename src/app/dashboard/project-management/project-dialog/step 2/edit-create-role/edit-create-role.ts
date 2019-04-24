import {
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { Client, Department, Project } from '../../../../../core/models';

export interface DialogData {
  active: boolean;
  allRoles;
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
  selector: "edit-create-role",
  templateUrl: './edit-create-role.html',
  styleUrls: ['../../project-dialog.css'],
})
export class EditCreateRole implements OnInit {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<EditCreateRole>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}
  @Input() title: string;
  @Input() siteOffsite;
  @Output() roleCreated = new EventEmitter<any>();
  @Input() roleToEdit: any;
  editCreateRoleForm: FormGroup;

  // Check when the roleToEdit.role value for mat-option updated
  compareFn: ((f1: any, f2: any) => boolean) | null = this.compareByValue;

  ngOnInit(): void {
    this.editCreateRoleForm = new FormGroup(
      {
        role: new FormControl(null),
        rate: new FormControl(null),
        onSiteRate: new FormControl(null),
      },
      this.inputValidation.bind(this)
    );
  }

  inputValidation(): { [s: string]: boolean } {
    if (this.editCreateRoleForm) {
      const role = this.editCreateRoleForm.get('role').value;
      const rate = this.editCreateRoleForm.get('rate').value;
      const onSiteRate = this.editCreateRoleForm.get('onSiteRate').value;

      if (this.siteOffsite === true) {
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

  createEditRole(role) {
    if (this.roleToEdit) {
      this.roleCreated.emit({
        rate: role.rate,
        onSiteRate: role.onSiteRate,
        role: {
          name: this.roleToEdit.role.name,
          roleId: this.roleToEdit.role.roleId,
        },
      });
    } else {
      this.roleCreated.emit(role);
    }

    // Check if the newly created role doesn't already exist
    this.data.roles = this.data.roles.filter(
      el => el.name !== this.editCreateRoleForm.value.role.name
    );
    // Sort roles alphabetically
    this.data.roles = this.data.roles.sort();
    this.editCreateRoleForm.reset();
    return this.data.roles;
  }

  compareByValue(f1: any, f2: any) {
    return f1 && f2 && f1.roleId === f2.roleId;
  }

  // Update the Form dynamically
  ngOnChanges() {
    if (this.editCreateRoleForm) {
      this.editCreateRoleForm.reset();
    }
    if (this.roleToEdit) {
      this.editCreateRoleForm.setValue({
        role: this.roleToEdit.role.roleId,
        rate: this.roleToEdit.rate,
        onSiteRate: this.roleToEdit.onSiteRate,
      });
    }
  }
}
