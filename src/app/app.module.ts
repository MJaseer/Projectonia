import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadinComponent } from './shared/modal/loadin/loadin.component';
import { ErrorComponent } from './shared/modal/error/error.component';

import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { appReducer } from './shared/store/app.reducer';
import { assigneeReducer, managerReducer, projectReducer, taskReducer } from './global/store/space.reducer';
import { ProjectEffects, SpaceEffects, TaskEffects, ManagerEffects } from './global/store/space.effect';

import { InputValidatorDirective } from './shared/directives/input-validator.directive';

import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';

import { NgxSpinnerModule } from 'ngx-spinner';
import { NgOtpInputModule } from 'ng-otp-input';

import { AssigneePipe } from './pipes/assignee.pipe';
import { MonthAndDatePipe } from './pipes/month.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { WishPipe } from './pipes/wish.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { SpaceInterceptor } from './user/space/helper/space.interceptor';
import { SpaceService } from './global/services/space.service';
import { TaskPipe } from './pipes/task.pipe';


@NgModule({
  declarations: [
    AppComponent,
    InputValidatorDirective,
    LoadinComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    StoreModule.forRoot({ appState: appReducer }),
    StoreModule.forFeature('manager', managerReducer),
    StoreModule.forFeature('project', projectReducer),
    StoreModule.forFeature('assignee', assigneeReducer),
    StoreModule.forFeature('Task', taskReducer),
    EffectsModule.forFeature([SpaceEffects]),
    EffectsModule.forFeature([ProjectEffects]),
    EffectsModule.forFeature([TaskEffects]),
    EffectsModule.forFeature([ManagerEffects]),
    FontAwesomeModule,
    MonthAndDatePipe,
    StatusPipe,
    AssigneePipe,
    TaskPipe,
    NgOtpInputModule,
    MatIconModule,
    OverlayModule,
    FormsModule,
    NgxSpinnerModule,
    ToastrModule,
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    WishPipe,
    CanvasJSAngularChartsModule,
  ],
  providers: [
    //   {
    //   provide: HTTP_INTERCEPTORS, 
    //   useClass: SpaceInterceptor, 
    //   multi: true
    // }
    {
      provide: SpaceService
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

