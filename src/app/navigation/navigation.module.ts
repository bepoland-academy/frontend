import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation.component';
import { CustomMaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationService } from './navigation.service';

@NgModule({
  declarations: [NavigationComponent ],
  imports: [
    CommonModule,
    BrowserModule,
    CustomMaterialModule,
    RouterModule
  ],
  exports: [
    NavigationComponent,
  ],
  providers: [
    NavigationService
  ]
})
export class NavigationModule { }
