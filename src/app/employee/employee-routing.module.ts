import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeLandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './services/auth.guard';
import { ListComponent } from './tasks/list/list.component';
import { ChatComponent } from '../chat/chat/chat.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: EmployeeLandingComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: ListComponent, canActivate: [authGuard] },
  { path: 'chats', component: ChatComponent, canActivate: [authGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
