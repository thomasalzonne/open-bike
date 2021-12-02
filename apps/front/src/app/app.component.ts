import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'open-bike-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  constructor(private socket: Socket) {}

  toggleSelectedState(): void{
    this.socket.emit('message','Bonjour à tous')
  }
}

