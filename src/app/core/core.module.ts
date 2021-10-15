import { DatePipe } from './pipes/date.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchPipe } from './pipes/search.pipe';
import { ImgFallbackDirective } from './directives/img-fallback.directive';



@NgModule({
  declarations: [
    DatePipe,
    SearchPipe,
    ImgFallbackDirective,
  ],
  exports: [
    DatePipe,
    SearchPipe,
    ImgFallbackDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [

  ]
})
export class CoreModule { }
