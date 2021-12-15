import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RentComponent } from './rent.component';
import { RouterModule, Routes } from '@angular/router';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const routes: Routes = [
  { path: '', component: RentComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forChild(routes)
  ]
})
export class RentModule { }
