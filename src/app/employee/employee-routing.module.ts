import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { ListComponent } from './tasks/list/list.component';

const routes: Routes = [
  { path: '', component: LandingComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: ListComponent ,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
