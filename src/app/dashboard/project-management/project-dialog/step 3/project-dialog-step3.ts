import {
  Component,
  Inject,
  OnInit,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Client, Department, Project } from '../../../../core/models';

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
  allRoles: any;
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
  selector: 'app-project-dialog-step3',
  templateUrl: './project-dialog-step3.html',
  styleUrls: ['../project-dialog.css'],
})

export class ProjectDialogStep3 implements OnInit {

  @Input() step3;
  @Input() siteOffsite;
  @Input() rolesSaved;
  @Input() consultantsSaved;

  @Output() consultantAdded = new EventEmitter<any>();
  @Output() consultantDeleted = new EventEmitter<any>();
  @Output() enableStep2 = new EventEmitter<any>();

  title;
  createEditConsultant = false;
  consultantToEdit;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDialogStep3>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {}

  backToStep2() {
    this.enableStep2.emit();
  }

  openAssignConsultant() {
    this.title = 'Add consultant';
    this.createEditConsultant = true;
    this.consultantToEdit = null;
  }

  openEditConsultant(consultant) {
    this.title = 'Consultant assignment';
    this.createEditConsultant = true;
    this.consultantToEdit = consultant;
  }

  consultantCreated(consultant) {
    this.consultantAdded.emit(consultant);
    this.createEditConsultant = false;
  }

  deleteConsultant(consultant) {
    this.consultantDeleted.emit(consultant);
    this.consultantToEdit = null;
    this.createEditConsultant = false;
  }

}
