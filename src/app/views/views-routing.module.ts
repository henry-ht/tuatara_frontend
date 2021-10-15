import { UserComponent } from './user/user.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes:Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: 'users',
    component: UserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewsRoutingModule { }
