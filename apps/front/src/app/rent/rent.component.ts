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
  parks : ManageParkDto[]= []
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
    console.log(park)
  }
  ChooseBike(bike: ManageBikeDto){
    if(!navigator.geolocation){
      return alert('Nous ne pouvons pas vous géolocaliser et ne pouvons pas vous laisser louer un vélo. Désolé')
    }
    navigator.geolocation.getCurrentPosition(function (position) {
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
  ngOnInit(): void {}

}
