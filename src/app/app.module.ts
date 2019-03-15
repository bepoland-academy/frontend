import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';

import { CustomMaterialModule } from './material/material.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { rootModule } from './app.routing';
import { NavigationService } from './dashboard/navigation/navigation.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_BASE_HREF } from '@angular/common';
import { PasswordModule } from './password/password.module';

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
    PasswordModule,
    DashboardModule,
    HttpClientModule,
  ],
  providers: [
    NavigationService,
    AuthService,
    HttpService,
    { provide: APP_BASE_HREF, useValue: '/' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
