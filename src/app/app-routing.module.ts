import { PrincipalComponent } from './layouts/principal/principal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    loadChildren: () => import('./views/views.module').then(i => i.ViewsModule),
  },
  {
    path: '**',
    redirectTo: '/users',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
