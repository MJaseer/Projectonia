import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { appReducer } from './shared/store/app.reducer';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MonthAndDatePipe } from './pipes/month.pipe';
import { StatusPipe } from './pipes/status.pipe';
import { assigneeReducer, managerReducer, projectReducer, taskReducer } from './global/store/space.reducer';
import { ProjectEffects, SpaceEffects, TaskEffects, ManagerEffects } from './global/store/space.effect';
import { AssigneePipe } from './pipes/assignee.pipe';
import { NgOtpInputModule } from 'ng-otp-input';
import { InputValidatorDirective } from './shared/directives/input-validator.directive';
import { MatIconModule } from '@angular/material/icon';
import { OverlayModule } from '@angular/cdk/overlay';
import { LoadinComponent } from './shared/modal/loadin/loadin.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './shared/modal/error/error.component';

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
    StoreModule.forFeature('manager',managerReducer),
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
    NgOtpInputModule,
    MatIconModule,
    OverlayModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }

