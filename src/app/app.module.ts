import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CustomMaterialModule} from './material/material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule, CustomMaterialModule, FormsModule, BrowserAnimationsModule, FlexLayoutModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
