import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLandingComponent } from '../space/auth-landing/auth-landing.component';
import { AssigneeComponent } from './assignee/assignee.component';
import { AddAssigneeComponent } from './add-assignee/add-assignee.component';
import { AuthEditAssigneComponent } from './auth-edit-assigne/auth-edit-assigne.component';
import { ListComponent } from './Project/list/list.component';
import { NewProjectComponent } from './Project/new-project/new-project.component';
import { OverViewComponent } from './Project/over-view/over-view.component';

const routes: Routes = [
  { path: '', component: AuthLandingComponent },
  { path: 'assignee', component: AssigneeComponent },
  { path: 'addAssignee', component: AddAssigneeComponent },
  { path: 'editAssigne/:id', component: AuthEditAssigneComponent },
  { path: 'project', component: OverViewComponent },
  { path: 'list', component: ListComponent },
  { path: 'newProject', component: NewProjectComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceRoutingModule { }
