import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManageBikeDto, ManageParkDto, ManageStationDto } from '@open-bike/lib';
import { Socket } from 'ngx-socket-io';
import { SocketService } from '../socket/socket.service';
@Component({
  selector: 'open-bike-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent {
  selectedPark ?: ManageParkDto;
  selectedStation ?: ManageStationDto;
  parks : ManageParkDto[]= []
  stations ?: ManageStationDto[] = []
  bikes :ManageBikeDto[] = []
  constructor( private http: HttpClient, private socketService: SocketService) {
    http.get<ManageParkDto[]>('/api/park').subscribe((res: any) => {
      this.parks = res
    })
  }

  choosePark(park: ManageParkDto){
    this.selectedPark = park
    this.stations = park.stations
  }

  chooseStation(station: ManageStationDto){
    this.selectedStation = station
    this.http.get('/api/station/'+station.id).subscribe((res : any) => {
      this.bikes = res.bikes
    })
  }
  
  chooseBike(bike: ManageBikeDto){
    this.socketService.rent(bike.id)
  }

}
