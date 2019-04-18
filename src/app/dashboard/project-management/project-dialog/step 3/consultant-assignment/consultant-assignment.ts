import {
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
  Input
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
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
  usersByDepartment: any;
  allUsersByDepartment: any;
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
  selector: "consultant-assignment",
  templateUrl: './consultant-assignment.html',
  styleUrls: ['../../project-dialog.css'],
})
export class ConsultantAssignment implements OnInit {
  @Input() title: string;
  @Output() consultantCreated = new EventEmitter<any>();
  @Input() consultantToEdit: any;
  @Input() rolesSaved;
  @Input() siteOffsite;


  assignRoleForm: FormGroup;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ConsultantAssignment>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.assignRoleForm = new FormGroup(
      {
        consultant: new FormControl(null, Validators.required),
        role: new FormControl(null, Validators.required),
      }
    );
  }

  createAssignRole(event) {
    this.consultantCreated.emit(event);
    // Check if the newly created role doesn't already exist
    this.data.usersByDepartment = this.data.usersByDepartment.filter(
      el => el.name !== this.assignRoleForm.value.consultant
    );
    // Sort roles alphabetically
    this.data.usersByDepartment = this.data.usersByDepartment.sort();
    this.assignRoleForm.reset();
    return this.data.usersByDepartment;
  }

  ngOnChanges() {
    if (this.assignRoleForm) {
      this.assignRoleForm.reset();
    }
    if (this.consultantToEdit) {
      this.assignRoleForm.setValue({
        consultant: this.consultantToEdit.consultant,
        role: this.consultantToEdit.role,
      });
    }
  }
}
