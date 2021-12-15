import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManageParkDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-parks',
  templateUrl: './parks.component.html',
  styleUrls: ['./parks.component.css']
})
export class ParksComponent implements OnInit {

  parks: ManageParkDto[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ManageParkDto[]>('/api/park').subscribe((res) => this.parks = res)
  }

  delete(id: number) {
    this.http.delete('/api/park/' + id).subscribe(() => {})
  }

}
