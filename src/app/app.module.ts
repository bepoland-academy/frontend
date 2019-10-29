import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';

import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { rootModule } from './app.routing';
import { PasswordModule } from './password/password.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    LoginModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    rootModule,
    PasswordModule,
    DashboardModule,
  ],
  providers: [ ],
  exports: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
