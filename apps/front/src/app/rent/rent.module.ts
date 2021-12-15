import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentComponent } from './rent.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RentComponent}
]

@NgModule({
  declarations: [
    RentComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class RentModule { }
