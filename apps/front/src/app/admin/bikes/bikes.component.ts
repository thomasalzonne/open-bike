import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ManageBikeDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  
  bikes: ManageBikeDto[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ManageBikeDto[]>('/api/bike').subscribe((res) => this.bikes = res)
  }

  delete(id: number) {
    this.http.delete('/api/bike/' + id).subscribe(() => {})
  }

}
