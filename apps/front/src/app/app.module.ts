import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { BannerModule } from './layout/banner/banner.module';
import { RentComponent } from './rent/rent.component';
import { MapModule } from './map/map.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthGuard } from './auth/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminGuard } from './admin/admin.guard';

const config: SocketIoConfig = { url: '/' };
const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then((m) => m.MapModule),
  },
  {
    path: 'rent',
    canActivate: [AuthGuard],
    loadChildren: () => import('./rent/rent.module').then((m) => m.RentModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
];
@NgModule({
  declarations: [AppComponent, HomeComponent, RentComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    SocketIoModule.forRoot(config),
    LayoutModule,
    BannerModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
