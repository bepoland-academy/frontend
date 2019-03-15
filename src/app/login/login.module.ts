import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from '../guards/auth.guard';
import { CustomMaterialModule } from '../material/material.module';
import { LoginComponent } from './login.component';
import { rootModule } from './login.routing';

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    rootModule,
  ],
  providers: [
    AuthGuard,
  ],
  exports: [
    LoginComponent,
  ],
})
export class LoginModule { }
