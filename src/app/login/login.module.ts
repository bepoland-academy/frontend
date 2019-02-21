import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import {CustomMaterialModule} from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { rootModule } from './login.routing';
import { AuthGuard } from '../guards/auth.guard';




@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    rootModule
  ],
  providers: [
    LoginService,
    AuthGuard
  ],
  exports: [LoginComponent]
})
export class LoginModule { }
