import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { NavComponent } from "./nav/nav.component";
import { NotFoundComponent } from './not-found/not-found.component';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { ForgotpassswordComponent } from './forgotpasssword/forgotpasssword.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { LinkSuccessComponent } from './link-success/link-success.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LandingComponent,
        NavComponent,
        NotFoundComponent,
        OtpComponent,
        ForgotpassswordComponent,
        NewPasswordComponent,
        LinkSuccessComponent,
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        UserRoutingModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        FormsModule,
        NgOtpInputModule,
        OverlayModule,
        MatDialogModule,
        FormsModule
    ],
})

export class UserModule { }
