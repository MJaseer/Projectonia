import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLandingComponent } from '../space/auth-landing/auth-landing.component';
import { AssigneeComponent } from './Assignee/assignee/assignee.component';
import { AddAssigneeComponent } from './Assignee/add-assignee/add-assignee.component';
import { AuthEditAssigneComponent } from './Assignee/auth-edit-assigne/auth-edit-assigne.component';
import { ListComponent } from './Project/Tasks/list/list.component';
import { NewProjectComponent } from './Project/new-project/new-project.component';
import { OverViewComponent } from './Project/over-view/over-view.component';
import { NewComponent } from './Project/Tasks/new/new.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardComponent } from './Project/Tasks/board/board.component';
import { TableComponent } from './Project/Tasks/table/table.component';

const routes: Routes = [
  { path: '', component: AuthLandingComponent },
  { path: 'assignee', component: AssigneeComponent },
  { path: 'addAssignee', component: AddAssigneeComponent },
  { path: 'editAssigne/:id', component: AuthEditAssigneComponent },
  { path: 'project', component: OverViewComponent },
  {
    path: 'task', component: ListComponent,
    children:
      [
        { path: 'new', component: NewComponent },
      ]
  },
  { path: 'newProject', component: NewProjectComponent },
  { path: 'profile' , component: ProfileComponent},
  { path: 'board' , component:BoardComponent},
  { path: 'table' , component:TableComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpaceRoutingModule { }
