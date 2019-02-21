import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { NavigationModule } from './navigation/navigation.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    NavigationModule
  ], exports: [DashboardComponent]
})
export class DashboardModule { }
