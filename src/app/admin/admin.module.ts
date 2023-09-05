import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UsersComponent } from './users/users.component';
import { AdminLandingComponent } from './landing/landing.component';
import { NavComponent } from './nav/nav.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { WishPipe } from '../pipes/wish.pipe';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    AdminLandingComponent,
    NavComponent,
    SideNavComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    WishPipe,
    CanvasJSAngularChartsModule,
    
  ]
})
export class AdminModule { }
