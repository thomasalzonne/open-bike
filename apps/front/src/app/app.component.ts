import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Socket } from 'ngx-socket-io';
@Component({
  selector: 'open-bike-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  constructor(private socket: Socket, private route: ActivatedRoute) {
    this.route.url.subscribe(route => console.log(route))
  }

  toggleSelectedState(): void{
    this.socket.emit('message','Bonjour à tous')
  }
}

