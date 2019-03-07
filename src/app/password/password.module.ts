import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordComponent } from './password.component';
import { rootModule } from './password.routing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CustomMaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PasswordComponent
  ],
  imports: [
    CommonModule,
    rootModule,
    FlexLayoutModule,
    CustomMaterialModule,
    FormsModule,
  ],
  exports: [
    PasswordComponent
  ]
})
export class PasswordModule { }
