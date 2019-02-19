import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CustomMaterialModule} from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from './login/login.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, CustomMaterialModule, BrowserAnimationsModule, LoginModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
