import { ViewsRoutingModule } from './views-routing.module';
import { CoreModule } from './../core/core.module';
import { LayoutsModule } from './../layouts/layouts.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    UserComponent
  ],
  imports: [
    CommonModule,
    LayoutsModule,
    CoreModule,
    ReactiveFormsModule,
    ViewsRoutingModule
  ]
})
export class ViewsModule { }
