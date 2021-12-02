import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router'

const config: SocketIoConfig = { url: '/' };
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
  
];
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes), HttpClientModule, SocketIoModule.forRoot(config), LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
