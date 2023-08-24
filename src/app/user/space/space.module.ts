import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpaceRoutingModule } from './space-routing.module';
import { AuthLandingComponent } from './auth-landing/auth-landing.component';
import { AuthHomeComponent } from './auth-home/auth-home.component';
import { AuthNavComponent } from './auth-nav/auth-nav.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpaceInterceptor } from './helper/space.interceptor';
import { SideBarComponent } from './side-bar/side-bar.component';
import { AssigneeComponent } from './Assignee/assignee/assignee.component';
import { AddAssigneeComponent } from './Assignee/add-assignee/add-assignee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthEditAssigneComponent } from './Assignee/auth-edit-assigne/auth-edit-assigne.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ListComponent } from './Project/Tasks/list/list.component';
import { ItemNavComponent } from './Project/item-nav/item-nav.component';
import { NewProjectComponent } from './Project/new-project/new-project.component';
import { OverViewComponent } from './Project/over-view/over-view.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BoardComponent } from './Project/board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NewComponent } from './Project/Tasks/new/new.component';
import { MonthAndDatePipe } from 'src/app/pipes/month.pipe';
import { StatusPipe } from 'src/app/pipes/status.pipe';
import { AssigneePipe } from 'src/app/pipes/assignee.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { ToastrModule } from 'ngx-toastr';
import { WishPipe } from 'src/app/pipes/wish.pipe';
import {MatSelectModule} from '@angular/material/select';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { Chart } from 'chart.js';
import { registerables } from 'chart.js';
Chart.register(...registerables)

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
    NewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SpaceRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    FontAwesomeModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MonthAndDatePipe,
    StatusPipe,
    AssigneePipe,
    OverlayModule,
    ToastrModule.forRoot({
      preventDuplicates:true
    }),
    WishPipe,
    CanvasJSAngularChartsModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpaceInterceptor,
      multi: true
    },
    {
      provide: MatDatepicker,
      useClass: MatDatepickerModule
    }
  ]
})

export class SpaceModule { }
