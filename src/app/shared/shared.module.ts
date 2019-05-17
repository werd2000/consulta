import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaterialModule } from '../material.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  declarations: [
    // BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  exports: [
    // BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
  ]
})
export class SharedModule { }
