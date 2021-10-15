import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FooterComponent } from './footer/footer.component';
import { CoreModule } from './../core/core.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    NavBarComponent,
    FooterComponent
  ],
  exports: [
    NavBarComponent,
    FooterComponent,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    CoreModule
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    NgxPaginationModule,
    FontAwesomeModule,
    CoreModule
  ]
})
export class SharedsModule { }
