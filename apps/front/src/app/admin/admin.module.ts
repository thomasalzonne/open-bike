import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { BikesComponent } from './bikes/bikes.component';
import { LayoutModule } from '../layout/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateComponent as CreateBike } from './bikes/create/create.component';
import { CreateComponent as CreateStation } from './stations/create/create.component';
import { CreateComponent as CreateUser } from './users/create/create.component';
import { CreateComponent as CreatePark } from './parks/create/create.component';
import { StationsComponent } from './stations/stations.component';
import { UsersComponent } from './users/users.component';
import { ParksComponent } from './parks/parks.component';
import { LayoutComponent } from './layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';


const routes: Routes = [
  {
    path: '', 
    component: AdminComponent,
    children: [
      {
        path: 'bikes',
        component: BikesComponent
      },
      {
        path: 'bikes/create',
        component: CreateBike
      },
      {
        path: 'bikes/edit/:id',
        component: CreateBike
      },
    ]
  },
];
@NgModule({
  declarations: [
    AdminComponent,
    BikesComponent,
    CreateBike,
    CreateUser,
    CreateStation,
    CreatePark,
    StationsComponent,
    UsersComponent,
    ParksComponent,
    LayoutComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), LayoutModule, ReactiveFormsModule, FormsModule
  ]
})
export class AdminModule { }
