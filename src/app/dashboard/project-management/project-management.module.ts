import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectManagementComponent, ProjectManagementDialog } from './project-management.component';
import { CustomMaterialModule } from '../../material/material.module';
import { ProjectManagementService } from './project-management.service';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    ProjectManagementComponent,
    ProjectManagementDialog,
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
  entryComponents: [ProjectManagementDialog],
})
export class ProjectManagementModule { }
