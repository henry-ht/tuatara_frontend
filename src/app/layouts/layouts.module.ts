import { SharedsModule } from './../shareds/shareds.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrincipalComponent } from './principal/principal.component';



@NgModule({
  declarations: [
    PrincipalComponent
  ],
  exports: [
    SharedsModule,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    SharedsModule
  ]
})
export class LayoutsModule { }
