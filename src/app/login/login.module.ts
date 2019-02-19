import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http'; 
import { TestRequest } from './login.service';
import {CustomMaterialModule} from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';




@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule, HttpClientModule, CustomMaterialModule, FormsModule, FlexLayoutModule
  ],
  providers: [TestRequest],
  exports: [LoginComponent]
})
export class LoginModule { }