import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    CustomMaterialModule,
  ],
})
export class SharedModule { }
