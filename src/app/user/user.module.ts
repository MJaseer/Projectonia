import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
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


@NgModule({
    declarations: [
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        LandingComponent,
        NavComponent,
        NotFoundComponent,
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
    ],
})

export class UserModule { }
