import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManageBikeDto, ManageParkDto, ManageStationDto } from '@open-bike/lib';
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
  bikeId = 0;
  constructor( private http: HttpClient) {
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
    if(!navigator.geolocation){
      return alert('Nous ne pouvons pas vous géolocaliser et ne pouvons pas vous laisser louer un vélo. Désolé')
    }
    navigator.geolocation.getCurrentPosition( (position) => {
      console.log(position)
    }, function(){
      alert("Nous n'arrivons pas à vous localiser. Veuillez réessayer.")
    })
    this.bikeId = bike.id
    this.bikes.map(el => {
      if(el.id === this.bikeId){
        this.bikes.splice(this.bikes.indexOf(el),1)
      }
    })
  }

}
