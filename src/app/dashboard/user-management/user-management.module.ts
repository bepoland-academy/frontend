import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserManagementComponent } from "./user-management.component";
import { UserManagementService } from "./user-management.service";
import { UserRegistrationModule } from "./user-registration/user-registration.module";
import { UsersReportModule } from "./users-report/users-report.module";

@NgModule({
  declarations: [
    UserManagementComponent,
  ],
  imports: [
    CommonModule,
    UserRegistrationModule,
    UsersReportModule,
    FlexLayoutModule,
  ],
  exports: [
    UserManagementComponent
  ],
  providers: [
    UserManagementService
  ],
})
export class UserManagementModule { }
