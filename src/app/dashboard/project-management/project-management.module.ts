import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { CustomMaterialModule } from '../../shared/material/material.module';
import { ProjectManagementService } from './project-management.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectManagementDialog } from './edit-project-dialog/edit-project-dialog';
import { DeleteProjectDialog } from './edit-project-dialog/delete-project-dialog';
import { CreateProjectDialog } from './create-project-dialog/create-project-dialog';

@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectManagementDialog,
    DeleteProjectDialog,
    CreateProjectDialog,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
  ],
  exports: [
    ProjectManagementComponent,
  ],
  providers: [
    ProjectManagementService,
  ],
  entryComponents: [
    ProjectManagementDialog,
    DeleteProjectDialog,
    CreateProjectDialog,
  ],
})
export class ProjectManagementModule { }
