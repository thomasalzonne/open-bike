import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket } from 'ngx-socket-io';

@WebSocketGateway()
export class LocationGateway {
  @WebSocketServer() server;

  constructor() {
    setInterval(() => {
      this.server.emit('update', this.rentedBikes.map((bikes) => ({ id: bikes.bikeId, position: bikes.position })))
    }, 1000)
  }

  rentedBikes: { client: Socket, bikeId: number, position: { lon: number, lat: number}}[] = []

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    console.log(payload)
  }

  @SubscribeMessage('rent-bike')
  rentBike(client: Socket, bikeId: number): string {
    console.log(bikeId)
    if(this.rentedBikes.find(bike => bike.bikeId === bikeId) || this.rentedBikes.find(bike => bike.client === client)) {
      return
    }
    this.rentedBikes.push({ client, bikeId, position: { lon: 0, lat: 0 }})
    client.on('disconnect', () => {
      this.rentedBikes = this.rentedBikes.filter(b => b.client !== client)
    })
    client.emit('rent-bike-ok', bikeId)
  }

  @SubscribeMessage('position')
  position(client: Socket, position: { lon: number, lat: number}) {
    const bike = this.rentedBikes.find(bike => bike.client === client)
    if(bike) bike.position = position
  }



}
