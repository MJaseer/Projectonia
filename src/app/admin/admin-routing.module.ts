import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { UsersComponent } from './users/users.component';
import { authGuard } from './service/auth.guard';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UsersComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
