import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { EmployeeLandingComponent } from './landing/landing.component';
import { NavComponent } from './nav/nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './tasks/list/list.component';
import { MonthAndDatePipe } from '../pipes/month.pipe';
import { StatusPipe } from '../pipes/status.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    EmployeeLandingComponent,
    NavComponent,
    SideNavComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MonthAndDatePipe,
    StatusPipe,
    MatIconModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ]
})
export class EmployeeModule { }
