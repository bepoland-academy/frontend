import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { CustomMaterialModule } from '../../shared/material/material.module';
import { ProjectManagementService } from './project-management.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectDialogComponent } from './project-dialog/project-dialog.component';
// import { ProjectDialogStep2 } from './project-dialog/step 2/project-dialog-step2';
// import { EditCreateRole } from './project-dialog/step 2/edit-create-role/edit-create-role';
// import { ProjectDialogStep3 } from './project-dialog/step 3/project-dialog-step3';
// import { ConsultantAssignment } from './project-dialog/step 3/consultant-assignment/consultant-assignment';
import { ProjectDialogStep1Component } from './project-dialog/project-dialog-step1/project-dialog-step1.component';
import { ProjectDialogStep2Component } from './project-dialog/project-dialog-step2/project-dialog-step2.component';
import { ProjectDialogStep3Component } from './project-dialog/project-dialog-step3/project-dialog-step3.component';

@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectDialogComponent,
    // ProjectDialogStep2,
    // EditCreateRole,
    // ProjectDialogStep3,
    // ConsultantAssignment,
    ProjectDialogStep1Component,
    ProjectDialogStep2Component,
    ProjectDialogStep3Component,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [ProjectManagementComponent],
  providers: [ProjectManagementService],
  entryComponents: [
    ProjectDialogComponent,
    // ProjectDialogStep2,
    // EditCreateRole,
    // ProjectDialogStep3,
    // ConsultantAssignment,
  ],
})
export class ProjectManagementModule {}

