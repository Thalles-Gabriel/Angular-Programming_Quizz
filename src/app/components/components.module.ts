import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { AppRoutingModule } from '../app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';



@NgModule({
  declarations: [
    SiteHeaderComponent,
    PagenotfoundComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    SiteHeaderComponent,
    FontAwesomeModule
  ]
})
export class ComponentsModule { }
