import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Seperate Angular + external libs imports from our app elements 
import { LoginModule } from './login/login.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { rootModule } from './app.routing';
import { PasswordModule } from './password/password.module';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
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
