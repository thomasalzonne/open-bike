import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  currentBikeId?: number;
  constructor(private socket: Socket) {
    setInterval(this.loop.bind(this), 1000)
    this.socket.on('rent-bike-ok', (bikeId: number) => this.currentBikeId = bikeId)
    this.socket.on('return-bike-ok', () => this.currentBikeId = undefined)
  }

  loop() {
    if (!navigator.geolocation) return console.log('Geolocation OFF')
    if (this.currentBikeId) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position)
        this.socket.emit('position', { lon: position.coords.longitude, lat: position.coords.latitude })
      })
    }
  }

  rent(bikeId: number) {
    this.socket.emit('rent-bike', bikeId)
  }

  return(bikeId: number, stationId: number) {
    this.socket.emit('return-bike', { bikeId, stationId })
  }

}
