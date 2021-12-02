import { LayoutModule } from './layout/layout.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const config: SocketIoConfig = { url: '/' };
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HttpClientModule, SocketIoModule.forRoot(config), LayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
