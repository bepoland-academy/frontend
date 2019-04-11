import { Component, ViewChild, Inject, OnInit } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatSnackBar } from '@angular/material';
import { Client, Department, Project } from '../../../core/models';
import { DeleteProjectDialog } from './delete-project-dialog';


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
  _links: {
    DELETE: {
      href: string;
    },
    self: {
      href: string;
    }
  };
}


@Component({
  selector: 'app-project-management-dialog',
  templateUrl: './edit-project-dialog.html',
  // styles: [`
  // .mat-card-header, .mat-dialog-actions {justify-content: space-around;}
  // .mat-card {text-align: center;}
  // .dialog {display: flex; justify-content: space-around;}
  // .column1 {display: flex; flex-direction: column}
  // `],
  styleUrls: ['../create-project-dialog/create-project-dialog.css'],
})

export class ProjectManagementDialog implements OnInit {

  // @ViewChild('updateForm') updateProjectForm: NgForm;
  @ViewChild('createForm') createProjectForm: NgForm;
  @ViewChild('assignRoleForm') assignRoleForm: NgForm;
  @ViewChild('editRoleForm') editRoleForm: NgForm;
  @ViewChild('addConsultantForm') addConsultantForm: NgForm;
  @ViewChild('editConsultantForm') editConsultantForm: NgForm;


  onsiteOffsite: boolean;
  step2 = false;
  assignRole = false;
  rolesSaved = [];
  editRole = true;
  roleToEdit;

  step3 = false;
  addConsultant = false;
  consultantsSaved = [];
  editConsultant = false;
  consultantToEdit;

  actualDepartment = '';

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectManagementDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private projectManagementService: ProjectManagementService,
    private snackBar: MatSnackBar
  ) {
    }
  ngOnInit(): void {
    this.checkDepartment();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  compareObjects(client1: Client, client2: Client): boolean {
    if (client1 && client2) {
      return client1.clientId === client2.clientId && client1.name === client2.name;
    }
  }

  checkDepartment() {
    this.actualDepartment = this.data.departments.find(
      el => el.departmentId === this.data.department
    ).name;
  }

  // updateProject() {
  //   this.dialogRef.close();
  //   this.updateProjectForm.value.client = this.data.client;
  //   this.projectManagementService.updateProject(this.data._links.self.href, this.updateProjectForm.value)
  //     .subscribe(() => {
  //       this.projectManagementService.changeReloadStatus();
  //     },
  //     (err) => {
  //     });
  // }

  deleteProject(project: Project): void {
    const dialogRef = this.dialog.open(DeleteProjectDialog, {
      width: '600px',
      data: { ...project },
    });
    this.dialogRef.close();
  }

  cancel(): void {
    this.dialogRef.close();
  }

  selectSite(event) {
    this.rolesSaved = [];
    this.consultantsSaved = [];
    this.onsiteOffsite = event.checked;
  }

  // departmentChosen(event) {
  //   this.consultantsSaved = [];
  //   this.rolesSaved = [];
  //   this.projectManagementService.getUsersByDepartment(event.value).subscribe((data) => {
  //     this.usersByDepartment = data._embedded.userBodyList;
  //     this.usersByDepartment = this.usersByDepartment.map((user) => {
  //       return user = {...user, name: user.firstName + ' ' + user.lastName};
  //     });
  //   });

  // }


  // Step 2
  goToStep2() {
    this.step2 = true;
  }

  onAssignRole(event) {
    this.assignRole = true;
    this.editRole = false;
  }

  createRole() {
    const role = this.assignRoleForm.value;
    const isRolePresent = this.rolesSaved.some((el) => role.role === el.role);
    if (isRolePresent) {
      this.snackBar.open(`Role ${role.role} already exists`, '', {
        duration: 2000,
      });
      return;
    }

    const newRole = {...this.assignRoleForm.value, id: this.rolesSaved.length};
    this.rolesSaved.push(newRole);
    this.assignRoleForm.reset();
    this.assignRole = false;
  }

  onEditRole(role) {
    this.editRole = true;
    this.assignRole = false;
    this.roleToEdit = role;
  }

  saveRole() {
    this.assignRole = false;
    this.assignRoleForm.reset();
    const editedRole = this.editRoleForm.value;
    const role = this.roleToEdit;
    this.rolesSaved = this.rolesSaved.map((el) => role.id === el.id ? editedRole : el);
    this.editRole = false;
    return this.rolesSaved;
  }

  deleteRole(role) {
    this.editRole = false;
    this.rolesSaved = this.rolesSaved.filter((el) => el.id !== role.id);
    return this.rolesSaved;
  }

  backToStep1() {
    this.step2 = false;
  }

  goToStep3() {
    this.step2 = false;
    this.step3 = true;
  }

  // Step 3
  onAddConsultant() {
    this.addConsultant = true;
    this.editConsultant = false;
  }

  createConsultant() {
    const consultant = this.addConsultantForm.value;
    const isConsultantPresent = this.consultantsSaved.some((el) => consultant.name === el.name);
    if (isConsultantPresent) {
      this.snackBar.open(`Consultant ${consultant.name} already exists`, '', {
        duration: 2000,
      });
      return;
    }

    const newConsultant = {...this.addConsultantForm.value, id: this.consultantsSaved.length};
    this.consultantsSaved.push(newConsultant);
    this.addConsultantForm.reset();
    this.addConsultant = false;
  }

  onEditConsultant(consultant) {
    this.editConsultant = true;
    this.addConsultant = false;
    this.consultantToEdit = consultant;
  }

  saveConsultant() {
    const editedConsultant = this.editConsultantForm.value;
    const consultant = this.consultantToEdit;
    this.consultantsSaved = this.consultantsSaved.map((el) => consultant.id === el.id ? editedConsultant : el);
    this.editConsultant = false;
    return this.consultantsSaved;
  }

  deleteConsultant(consultant) {
    this.editConsultant = false;
    this.consultantsSaved = this.consultantsSaved.filter((el) => el.id !== consultant.id);
    return this.rolesSaved;
  }

  backToStep2() {
    this.step3 = false;
    this.step2 = true;
  }

  updateProject() {
    this.dialogRef.close();
  }
}

