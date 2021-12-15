import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


const routes: Routes = [
  { path: '', component: MapComponent}
]

@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
    CommonModule, RouterModule.forChild(routes), LeafletModule
  ]
})
export class MapModule { }
