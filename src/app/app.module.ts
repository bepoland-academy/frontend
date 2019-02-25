import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoginModule} from './login/login.module';
import {UserManagementModule} from './user-management/user-management.module';


import { CustomMaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { NavigationModule } from './navigation/navigation.module';
import { rootModule } from './app.routing';
import { TimeTrackingComponent } from './time-tracking.component';
import { ReportsComponent } from './reports.component';
import { HistoricalDataComponent } from './historical-data.component';
import { TimeApprovalComponent } from './time-approval.component';
import { ProjectManagmentComponent } from './project-managment.component';
import { UserManagmentComponent } from './user-managment.component';
import { RoleAuthService } from './roleAuth.service';

@NgModule({
  declarations: [
    AppComponent,
    TimeTrackingComponent,
    ReportsComponent,
    HistoricalDataComponent,
    TimeApprovalComponent,
    ProjectManagmentComponent,
    UserManagmentComponent,
  ],
  imports: [
    LoginModule,
    UserManagementModule,
    BrowserModule,
    CustomMaterialModule,
    FormsModule,
    BrowserAnimationsModule,

    NavigationModule,
    rootModule,
  ],
  providers: [RoleAuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
