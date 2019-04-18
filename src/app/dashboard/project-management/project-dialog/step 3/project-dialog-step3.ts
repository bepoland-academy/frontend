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
  // @Output() stepChange = new EventEmitter<any>();
  @Input() step3;
  @Output() enableStep2 = new EventEmitter<any>();
  @Input() siteOffsite;
  @Output() consultantDeleted = new EventEmitter<any>();
  @Output() consultantAdded = new EventEmitter<any>();
  @Output() pushConsultant = new EventEmitter<any>();
  @Input()  consultantsSaved;
  @Input() rolesSaved;

  title;

  usersByDepartment;
  createEditConsultant = false;
  consultantToEdit;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDialogStep3>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
  }

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
    console.log(consultant);
    this.pushConsultant.emit(consultant);
    this.consultantAdded.emit(consultant);
    this.createEditConsultant = false;
  }

  deleteConsultant(consultant) {
    this.consultantDeleted.emit(consultant);
    this.consultantToEdit = null;
    this.createEditConsultant = false;
    this.consultantsSaved = this.consultantsSaved.filter(el => el.consultant !== consultant.consultant);
    const consultantRestored = { consultant: consultant.consultant };
    this.data.usersByDepartment = this.data.usersByDepartment.concat(consultantRestored);
    this.data.usersByDepartment.sort((a, b) =>
      a.consultant > b.consultant ? 1 : b.consultant > a.consultant ? -1 : 0
    );
    return this.consultantsSaved, this.data.usersByDepartment;
  }

  // ngOnChanges(changes: SimpleChanges) {
  //   const currentSiteModel: SimpleChange = changes.siteOffsite;
  //   if (currentSiteModel.currentValue !== currentSiteModel.previousValue) {
  //     this.rolesSaved = [];
  //     this.data.roles = this.data.allRoles;
  //     this.siteOffsite = currentSiteModel.currentValue;
  //   }
  // }
}
