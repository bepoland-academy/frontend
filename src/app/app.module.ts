import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';

import { CustomMaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { rootModule } from './app.routing';
import { RoleAuthService } from './dashboard/roleAuth.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    LoginModule,
    BrowserModule,
    FormsModule,
    CustomMaterialModule,
    BrowserAnimationsModule,
    rootModule,
    LoginModule,
    DashboardModule,
    HttpClientModule
  ],
  providers: [
    RoleAuthService,
    AuthService,
    HttpService
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
