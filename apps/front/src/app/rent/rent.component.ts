import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManageBikeDto, ManageParkDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-rent',
  templateUrl: './rent.component.html',
  styleUrls: ['./rent.component.css']
})
export class RentComponent implements OnInit {
  parks : ManageParkDto[]= [
    {
      id: 1,
      name : 'Parc de la roseraie',
      city: 'Toulouse',
    },
    {
      id: 2,
      name: 'Parc du Vigan',
      city: 'Albi'
    }
  ]
  bikes = []
  constructor( private http: HttpClient) {
    http.get('/api/park').subscribe((res : any) => {
      console.log(res)
    })
  }

  ngOnInit(): void {
  }

}
