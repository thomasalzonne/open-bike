import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@open-bike/api-interfaces';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { map } from 'rxjs/operators';
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

