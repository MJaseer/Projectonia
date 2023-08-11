import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { guardGuard } from './service/guard.guard';
import { OtpComponent } from './otp/otp.component';
import { ForgotpassswordComponent } from './forgotpasssword/forgotpasssword.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { LinkSuccessComponent } from './link-success/link-success.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'space',
    canActivateChild: [guardGuard],
    loadChildren: () => import('./space/space.module').then((_) => _.SpaceModule),
  },
  { path: 'otp', component: OtpComponent },
  { path: 'forgotPassword', component: ForgotpassswordComponent },
  { path: 'newPassword', component: NewPasswordComponent },
  { path: 'forgotSuccess', component: LinkSuccessComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
