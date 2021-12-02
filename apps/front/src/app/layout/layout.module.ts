import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { BannerComponent } from './banner/banner.component';



@NgModule({
  declarations: [
    HeaderComponent,
    BannerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [HeaderComponent, BannerComponent]
})
export class LayoutModule { }
