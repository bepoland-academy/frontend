import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { NavigationComponent } from './navigation.component';
import { CustomMaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CustomMaterialModule,
    RouterModule
  ],
  exports: [
    NavigationComponent
  ],
  providers: []
})
export class NavigationModule { }
