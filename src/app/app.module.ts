import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CustomMaterialModule} from './material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http'; 
import { TestRequest } from './login/login.service';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, CustomMaterialModule, FormsModule, BrowserAnimationsModule, FlexLayoutModule, HttpClientModule 
  ],
  providers: [TestRequest],
  bootstrap: [AppComponent]
})
export class AppModule { }
