import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreloaderComponent } from './preloader.component';
import { CustomMaterialModule } from '../material/material.module';


@NgModule({
  declarations: [PreloaderComponent],
  imports: [
    CommonModule,
    CustomMaterialModule
  ],
  exports: [PreloaderComponent]
})
export class PreloaderModule { }
