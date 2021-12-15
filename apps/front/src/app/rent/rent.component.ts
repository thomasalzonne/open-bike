import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManageBikeDto, ManageParkDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  selectedPark ?: ManageParkDto;
  parks : ManageParkDto[]= [
    {
      id: 1,
      name : 'Parc de la roseraie',
      city: 'Toulouse',
      bikes: [
        {
          id : 0,
          stationId : 1
        },
        {
          id : 1,
          stationId : 1
        },
        {
          id : 2,
          stationId : 1
        }
      ]
    },
    {
      id: 2,
      name: 'Parc du Vigan',
      city: 'Albi',
      bikes : []
    }
  ]
  bikes :ManageBikeDto[] = []
  bikeId : number = 0;
  constructor( private http: HttpClient) {
    http.get('/api/park').subscribe((res : any) => {
      res.map((el: ManageParkDto) => {
        this.parks.push(el)
      });
    })
  }
  Choose(park: ManageParkDto){
    this.selectedPark = park
    this.bikes = park.bikes
  }
  ChooseBike(bike: ManageBikeDto){
    this.bikeId = bike.id
    this.bikes.map(el => {
      if(el.id === this.bikeId){
        this.bikes.splice(this.bikes.indexOf(el),1)
      }
    })
  }
  ngOnInit(): void {
  }

}
