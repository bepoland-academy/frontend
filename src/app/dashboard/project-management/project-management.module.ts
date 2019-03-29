import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent } from './project-management.component';
import { CustomMaterialModule } from '../../shared/material/material.module';
import { ProjectManagementService } from './project-management.service';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ProjectManagementDialog } from './project-management-dialog/project-management-dialog';
import { DeleteProjectDialog } from './project-management-dialog/delete-project-dialog';

@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectManagementDialog,
    DeleteProjectDialog,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
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
  ],
})
export class ProjectManagementModule { }
