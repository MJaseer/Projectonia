import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpaceInterceptor } from './helper/space.interceptor';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AssigneeComponent } from './assignee/assignee.component';
import { AddAssigneeComponent } from './add-assignee/add-assignee.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AuthLandingComponent,
    AuthHomeComponent,
    AuthNavComponent,
    SideBarComponent,
    AssigneeComponent,
    AddAssigneeComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SpaceRoutingModule,
    ReactiveFormsModule,
  ],
  providers:[
    {
      provide:HTTP_INTERCEPTORS,
      useClass:SpaceInterceptor,
      multi:true
    }
  ]
})

export class SpaceModule { }
