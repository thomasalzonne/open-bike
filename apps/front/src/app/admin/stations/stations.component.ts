import { Component, OnInit } from '@angular/core';
import { ManageStationDto } from '@open-bike/lib';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'open-bike-stations',
  templateUrl: './stations.component.html',
  styleUrls: ['./stations.component.css']
})
export class StationsComponent implements OnInit {

  stations: ManageStationDto[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ManageStationDto[]>('/api/station').subscribe((res) => this.stations = res)
  }

  delete(id: number) {
    this.http.delete('/api/station/' + id).subscribe(() => {})
  }

}
