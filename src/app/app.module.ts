import { ChangeDetectionStrategy, ChangeDetectorRef, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { TaskPipe } from './pipes/task.pipe';
import { MatDialogModule } from '@angular/material/dialog';
import { SpinnerComponent } from './shared/modal/spinner/spinner.component';
import { LoadingInterceptor } from './shared/interceptor/loading.interceptor';
import { PriorityPipe } from './pipes/priority.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InputValidatorDirective,
    ErrorComponent,
    SpinnerComponent,
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
    ToastrModule.forRoot({
      preventDuplicates: true
    }),
    WishPipe,
    CanvasJSAngularChartsModule,
    MatDialogModule,
    NgxSpinnerModule,
    MatDialogModule,
    PriorityPipe
  ],
  providers: [
      {
      provide: HTTP_INTERCEPTORS, 
      useClass: SpaceInterceptor, 
      multi: true
      },
      {
        provide:HTTP_INTERCEPTORS,
        useClass:LoadingInterceptor,
        multi:true
      }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }

