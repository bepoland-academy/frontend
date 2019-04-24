import { Component, Inject, OnInit, Input } from '@angular/core';
import { ProjectManagementService } from '../project-management.service';
import { FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { Client, Department, Project } from '../../../core/models';

export interface DialogData {
  project: any;
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
  allUsersByDepartment;
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
  constructor(
    private projectManagementService: ProjectManagementService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ProjectDialogStep1>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  mainForm: FormGroup;
  rates: FormArray;
  consultants: FormArray;
  onsiteOffsite = false;
  departmentSelected: string;
  step2 = false;
  step3 = false;
  rolesSaved = [];
  consultantsSaved = [];

  compareClient: ((f1: any, f2: any) => boolean) | null = this.compareClientId;

  ngOnInit(): void {
    this.projectManagementService.test().subscribe((data) => {
      console.log(data);
    });
    this.projectManagementService.getProjects(this.data.department).subscribe((data) => {
      console.log(data);
    });
    if (!this.data.project) {
      this.restoreAllRoleslist();
      this.restoreAllConsultantslist();
      this.createNewForm();
    } else {
      this.createFormFromProject();
    }
  }

  compareClientId(f1: any, f2: any) {
    return f1 && f2 && f1.clientId === f2.clientId;
  }

  createNewForm() {
    this.data.usersByDepartment = this.data.allUsersByDepartment;
    this.mainForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      client_id: new FormControl(null, Validators.required),
      comments: new FormControl(null),
      department_guid: new FormControl(this.data.department),
      offSiteOnly: new FormControl(true),
      active: new FormControl(true),
      rates: new FormArray([]),
    });
  }

  createFormFromProject() {
    // Create Main Form based on the Project edited
    this.mainForm = new FormGroup({
      name: new FormControl(this.data.project.name, Validators.required),
      client_id: new FormControl(
        this.data.project.client.name,
        Validators.required
      ),
      comments: new FormControl(this.data.project.comments),
      department_guid: new FormControl(this.data.project.department_guid),
      offSiteOnly: new FormControl(this.data.project.offSiteOnly),
      active: new FormControl(this.data.project.active),
      rates: new FormArray([]),
    });

    // Add roles to the rates array
    this.data.project.rates.forEach(rate => {
      this.addRolesFromProject(rate);
    });

    this.createRolesSavedFromProject();

    // Remove already saved roles form the Dropdown list
    // of roles available for choosing
    this.updateRolesToChoose();

    this.createConsultantsSavedFromProject();

    // Add consultants to each role in the Form rates
    setTimeout(() => {
      this.addConsultantsFromProject();
    }, 3000);

    this.onsiteOffsite = !this.data.project.offSiteOnly;
  }

  addRolesFromProject(role) {
    this.rates = this.mainForm.get('rates') as FormArray;
    this.rates.push(this.createRoleFromProject(role));
  }

  createRoleFromProject(role): FormGroup {
    return new FormGroup({
      role_id: new FormControl(role.role_id),
      rate: new FormControl(role.rate),
      onSiteRate: new FormControl(role.onSiteRate),
      consultants: new FormArray([]),
    });
  }

  addConsultantsFromProject() {
    this.rates = this.mainForm.get('rates') as FormArray;

    this.rates.value.forEach(formRate => {
      this.data.project.rates.forEach(rate => {
        rate.consultants.forEach(consultant => {
          if (formRate.role_id === rate.role_id) {
            this.rates
              .at(this.rates.value.findIndex(el => el.role_id === rate.role_id))
              .get('consultants')
              .value.push(consultant);
          }
        });
      });
    });
  }

  restoreAllRoleslist() {
    this.projectManagementService.getRoles().subscribe((data: any) => {
      this.data.roles = data._embedded.roleBodyList;
      this.data.roles = this.data.roles.sort((a, b) =>
        a.name > b.name ? 1 : b.name > a.name ? -1 : 0
      );
    });
  }

  restoreAllConsultantslist() {
    this.projectManagementService
      .getUsersByDepartment(this.data.department)
      .subscribe(data => {
        this.data.usersByDepartment = data._embedded.userBodyList;
        this.data.usersByDepartment = this.data.usersByDepartment.map(user => {
          return (user = {
            ...user,
            name: user.firstName + ' ' + user.lastName,
          });
        });
        this.data.usersByDepartment = this.data.usersByDepartment.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      });
  }

  updateRolesToChoose() {
    this.data.project.rates.forEach(projectRole => {
      this.data.roles.forEach(role => {
        if (projectRole.role_id === role.roleId) {
          this.data.roles.splice(
            this.data.roles.findIndex(el => el.roleId === role.roleId),
            1
          );
        }
      });
    });
  }

  createRolesSavedFromProject() {
    this.restoreAllRoleslist();
    setTimeout(() => {
      this.data.project.rates.forEach(rate => {
        this.data.roles.forEach(role => {
          if (rate.role_id === role.roleId) {
            this.rolesSaved = this.rolesSaved.concat({
              onSiteRate: rate.onSiteRate,
              rate: rate.rate,
              role: { name: role.name, roleId: role.roleId },
            });
          }
        });
      });
      this.updateRolesToChoose();
    }, 1000);
  }

  createConsultantsSavedFromProject() {
    // this.restoreAllRoleslist();
    this.restoreAllConsultantslist();

    setTimeout(() => {
      let array = [];
      this.data.project.rates.forEach(rate => {
        rate.consultants.forEach(consultant => {
          this.rolesSaved.forEach(role => {
            if (rate.role_id === role.role.roleId) {
              array = array.concat({
                consultant,
                role: { name: role.role.name, roleId: role.role.roleId },
              });
            }
          });
        });
      });

      let array2 = [];
      this.data.usersByDepartment.forEach(user => {
        array.forEach(consultant => {
          if (consultant.consultant === user.userId) {
            array2 = array2.concat({
              consultant: user.name,
              role: consultant.role,
            });
          }
        });
      });

      this.consultantsSaved = this.consultantsSaved.concat(array2);
      this.consultantsSaved = this.consultantsSaved.sort((a, b) =>
        a.consultant > b.consultant ? 1 : b.consultant > a.consultant ? -1 : 0
      );

      // Remove already saved consultants form the Dropdown list
      // of consultants available for choosing
      this.data.project.rates.forEach(rate => {
        rate.consultants.forEach(consultant => {
          this.data.usersByDepartment.forEach(user => {
            if (consultant === user.userId) {
              const index = this.data.usersByDepartment.findIndex(
                el => el.userId === consultant
              );
              this.data.usersByDepartment.splice(index, 1);
            }
          });
        });
      });
    }, 1000);
  }

  // Add role to project
  roleAdded(role) {
    this.addRoleToForm(role);
    this.addRoleToList(role);
  }

  addRoleToForm(role): void {
    this.rates = this.mainForm.get('rates') as FormArray;

    const isRolePresent = this.rates.value.some(
      el => role.role.roleId === el.role_id
    );

    if (isRolePresent) {
      this.rates
        .at(this.rates.value.findIndex(el => el.role_id === role.role.roleId))
        .get('rate')
        .setValue(role.rate);
      this.rates
        .at(this.rates.value.findIndex(el => el.role_id === role.role.roleId))
        .get('onSiteRate')
        .setValue(role.onSiteRate);
    } else {
      this.rates.push(this.createRole(role));
    }
  }
  createRole(role): FormGroup {
    return new FormGroup({
      role_id: new FormControl(role.role.roleId),
      rate: new FormControl(role.rate),
      onSiteRate: new FormControl(role.onSiteRate),
      consultants: new FormArray([]),
    });
  }

  addRoleToList(role) {
    const isRolePresent = this.rolesSaved.some(
      el => role.role.roleId === el.role.roleId
    );
    if (isRolePresent) {
      this.rolesSaved = this.rolesSaved.map(el =>
        role.role.roleId === el.role.roleId ? role : el
      );
      this.rolesSaved.sort((a, b) =>
        a.role.name > b.role.name ? 1 : b.role.name > a.role.name ? -1 : 0
      );

      return this.rolesSaved;
    } else {
      const newRole = {
        ...role,
      };
      this.rolesSaved.push(newRole);
      this.rolesSaved.sort((a, b) =>
        a.role.name > b.role.name ? 1 : b.role.name > a.role.name ? -1 : 0
      );
      return this.rolesSaved;
    }
  }

  roleDeleted(role) {
    // Remove role from Form
    this.rates.removeAt(
      this.rates.value.findIndex(el => el.role_id === role.role.roleId)
    );

    // Remove role from the list of saved roles
    this.rolesSaved = this.rolesSaved.filter(
      el => el.role.roleId !== role.role.roleId
    );

    // Add removed role to the list of available roles
    // in the dropdown list of roles
    const roleRestored = { ...role.role };
    this.data.roles = this.data.roles.concat(roleRestored);
    this.data.roles.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    this.updateConsultantsOnRoleDelete(role.role.roleId, role);
  }

  updateConsultantsOnRoleDelete(roleId, role) {
    // Get consultants' names assigned to the role deleted
    let consultants = [];
    let consultantsNames = [];
    this.consultantsSaved.forEach(consultant => {
      if (consultant.role.roleId === roleId) {
        consultants = consultants.concat(consultant.consultant);
      }
    });

    this.consultantsSaved = this.consultantsSaved.sort((a, b) =>
      a.consultant > b.consultant ? 1 : b.consultant > a.consultant ? -1 : 0
    );

    consultants.forEach(consultantName => {
      consultantsNames = consultantsNames.concat({
        name: consultantName,
      });
    });

    // Add consultants assigned to the deleted role to the dropdown lost
    // of consultants available for choosing
    this.data.usersByDepartment = this.data.usersByDepartment.concat(
      consultantsNames
    );

    this.data.usersByDepartment = this.data.usersByDepartment.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    // Remove consultants assigned to a deleted role form the consultantsSaved list
    this.consultantsSaved = this.consultantsSaved.filter(
      consultant => consultant.role.roleId !== role.role.roleId
    );
  }

  // Assign consultant to a project
  consultantAdded(consultant) {
    this.getConsultantIdToAdd(consultant);
    this.addConsultantToList(consultant);
  }

  getConsultantIdToAdd(consultant) {
    // Get Consultant ID
    this.projectManagementService
      .getUsersByDepartment(this.data.department)
      .subscribe(data => {
        let consultantId;
        let allUsers;
        allUsers = data._embedded.userBodyList;
        allUsers = allUsers.map(user => {
          return (user = {
            ...user,
            name: user.firstName + ' ' + user.lastName,
          });
        });
        allUsers.forEach(user => {
          if (consultant.consultant === user.name) {
            consultantId = user.userId;
          }
        });

        this.addConsultantToForm(consultant, consultantId);
      });
  }

  addConsultantToForm(consultant, consultantId): void {
    this.rates = this.mainForm.get('rates') as FormArray;

    for (let i = 0; i < this.rates.length; i++) {
      if (
        this.rates
          .at(i)
          .get('consultants')
          .value.some(el => consultantId === el)
      ) {
        this.rates
          .at(i)
          .get('consultants')
          .value.splice(
            this.rates
              .at(i)
              .get('consultants')
              .value.findIndex(el => el === consultantId),
            1
          );
      }
    }
    this.rates
      .at(
        this.rates.value.findIndex(el => el.role_id === consultant.role.roleId)
      )
      .get('consultants')
      .value.push(consultantId);
  }

  addConsultantToList(consultant) {
    const isConsultantPresent = this.consultantsSaved.some(
      el => consultant.consultant === el.consultant
    );
    if (isConsultantPresent) {
      this.consultantsSaved = this.consultantsSaved.map(el =>
        consultant.consultant === el.consultant ? consultant : el
      );
      this.consultantsSaved = this.consultantsSaved.sort((a, b) =>
        a.consultant > b.consultant ? 1 : b.consultant > a.consultant ? -1 : 0
      );
      return this.consultantsSaved;
    } else {
      const newConsultant = {
        ...consultant,
      };
      this.consultantsSaved.push(newConsultant);
      this.consultantsSaved = this.consultantsSaved.sort((a, b) =>
        a.consultant > b.consultant ? 1 : b.consultant > a.consultant ? -1 : 0
      );
      return this.consultantsSaved;
    }
  }

  consultantDeleted(consultant) {
    this.getConsultantIdToRemove(consultant);
    this.removeConsultantFromList(consultant);
  }

  removeConsultantFromList(consultant) {
    this.consultantsSaved = this.consultantsSaved.filter(
      el => el.consultant !== consultant.consultant
    );

    // Add deleted consultant to the Dropdown list of available consultants
    const consultantRestored = { name: consultant.consultant };
    this.data.usersByDepartment = this.data.usersByDepartment.concat(
      consultantRestored
    );
    this.data.usersByDepartment.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );
  }

  getConsultantIdToRemove(consultant) {
    // Get Consultant ID
    this.projectManagementService
      .getUsersByDepartment(this.data.department)
      .subscribe(data => {
        let consultantId;
        let allUsers;
        allUsers = data._embedded.userBodyList;
        allUsers = allUsers.map(user => {
          return (user = {
            ...user,
            name: user.firstName + ' ' + user.lastName,
          });
        });
        allUsers.forEach(user => {
          if (consultant.consultant === user.name) {
            consultantId = user.userId;
          }
        });

        this.deleteConsultantFromForm(consultant, consultantId);
      });
  }

  deleteConsultantFromForm(consultant, consultantId) {
    // Remove consultant from Form
    this.consultants = this.rates
      .at(
        this.rates.value.findIndex(el => el.role_id === consultant.role.roleId)
      )
      .get('consultants') as FormArray;

    this.consultants.value.splice(
      this.consultants.value.findIndex(el => el === consultantId),
      1
    );
  }

  // Navigation
  selectSite(event) {
    this.createNewForm();
    this.onsiteOffsite = event.checked;
    this.mainForm.get('offSiteOnly').setValue(!event.checked);
    this.rolesSaved = [];
    this.consultantsSaved = [];
    this.data.roles = this.data.allRoles;
    this.data.usersByDepartment = this.data.allUsersByDepartment;
  }

  cancel(): void {
    this.dialogRef.close();
  }
  goToStep2() {
    this.step2 = true;
    console.log(this.mainForm.value);
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

  createProject() {
    this.data.clients.forEach(client => {
      if (this.mainForm.get('client_id').value === client.name) {
        this.mainForm.get('client_id').setValue(client.clientId);
      }
    });

    if (!this.data.project) {
      this.projectManagementService
        .sendNewProject(this.mainForm.value)
        .subscribe(
          () => {},
          error => {
            console.log(error);
          }
        );
    } else {
      this.projectManagementService
        .updateProject(this.data.project.id, {
          ...this.mainForm.value,
          id: this.data.project.id,
        })
        .subscribe(
          () => {},
          error => {
            console.log(error);
          }
        );
    }

    this.dialogRef.close();
    this.projectManagementService.changeReloadStatus();
    console.log(this.mainForm);
  }

  deleteProject() {
    this.rolesSaved.forEach(roleSaved => {
      if (
        !this.data.roles.some(role => roleSaved.role.roleId === role.roleId)
      ) {
        this.data.roles.push({
          roleId: roleSaved.role.roleId,
          name: roleSaved.role.name,
        });
      }
    });

    this.data.roles = this.data.roles.sort((a, b) =>
      a.name > b.name ? 1 : b.name > a.name ? -1 : 0
    );

    this.projectManagementService.deleteProject(this.data.project.id).subscribe(
      () => {
        console.log('deleted');
      },
      error => {
        console.log(error);
      }
    );
    this.dialogRef.close();
    this.projectManagementService.changeReloadStatus();
  }
}
