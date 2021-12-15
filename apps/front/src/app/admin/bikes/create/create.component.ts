import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ManageBikeDto, ManageStationDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form = new FormGroup({
    station: new FormControl(null, [Validators.required])
  });

  stations: ManageStationDto[] = []

  editId?: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.params.subscribe(r => {
      if(r.id) {
        this.editId = r.id
        this.http.get<ManageBikeDto>('/api/bike/' + this.editId).subscribe((response) => {
          this.form.patchValue(response)
        })
      }
    })
    this.getStations()
  }

  submit() {
    if(!this.editId) {
      this.http.post('/api/bike', this.form.value).subscribe()
    }
    else {
      this.http.patch('/api/bike/' + this.editId, { station: { id: 1 }}).subscribe()
    }
  }

  change($event: any) {
    this.form.patchValue({[$event.target.name]: $event.target.value})
  }

  getStations() {
    this.http.get<ManageStationDto[]>('/api/station').subscribe(res => this.stations = res)
  }

}
