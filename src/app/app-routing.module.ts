import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './user/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./user/user.module').then((_) => _.UserModule)
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then((_) => _.EmployeeModule)
  },
  {
    path:'admin',
    loadChildren:()=> import('./admin/admin.module').then((_) => _.AdminModule)
  },
  {
    path:'**',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
