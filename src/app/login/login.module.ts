import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { FormsModule } from "@angular/forms";
import { AuthGuard } from "../guards/auth.guard";
import { CustomMaterialModule } from "../material/material.module";
import { LoginComponent } from "./login.component";
import { rootModule } from "./login.routing";
import { LoginService } from "./login.service";

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CustomMaterialModule,
    FormsModule,
    FlexLayoutModule,
    rootModule,
  ],
  providers: [
    LoginService,
    AuthGuard,
  ],
  exports: [
    LoginComponent
  ],
})
export class LoginModule { }
