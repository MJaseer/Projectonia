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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthEditAssigneComponent } from './auth-edit-assigne/auth-edit-assigne.component';
import { assigneeReducer, projectReducer } from './store/space.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProjectEffects, SpaceEffects } from './store/space.effect';
import { MatDialogModule } from '@angular/material/dialog';
import { ListComponent } from './Project/list/list.component';
import { ItemNavComponent } from './Project/item-nav/item-nav.component';
import { NewProjectComponent } from './Project/new-project/new-project.component';
import { OverViewComponent } from './Project/over-view/over-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoardComponent } from './Project/board/board.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AuthLandingComponent,
    AuthHomeComponent,
    AuthNavComponent,
    SideBarComponent,
    AssigneeComponent,
    AddAssigneeComponent,
    AuthEditAssigneComponent,
    ListComponent,
    ItemNavComponent,
    NewProjectComponent,
    OverViewComponent,
    BoardComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SpaceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    StoreModule.forFeature('project',projectReducer),
    StoreModule.forFeature('assignee',assigneeReducer),
    EffectsModule.forFeature([SpaceEffects]),
    EffectsModule.forFeature([ProjectEffects]),
    FontAwesomeModule,
    MatIconModule,
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
