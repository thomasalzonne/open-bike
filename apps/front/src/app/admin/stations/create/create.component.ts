import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ManageStationDto, ManageParkDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    capacity: new FormControl('', [Validators.required]),
    lon: new FormControl('', [Validators.required]),
    lat: new FormControl('', [Validators.required]),
    park: new FormControl(null, [Validators.required])
  });

  parks: ManageParkDto[] = []

  editId?: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.params.subscribe(r => {
      if(r.id) {
        this.editId = r.id
        this.http.get<ManageStationDto>('/api/station/' + this.editId).subscribe((response) => {
          this.form.patchValue({...response, park: response.park?.id})
        })
      }
    })
    this.getParks()
  }

  submit() {
    if(!this.editId) {
      this.http.post('/api/station', this.form.value).subscribe()
    }
    else {
      this.http.patch('/api/station/' + this.editId, this.form.value).subscribe()
    }
  }

  change($event: any) {
    console.log($event.target.value)
    this.form.patchValue({[$event.target.name]: $event.target.value})
  }

  getParks() {
    this.http.get<ManageParkDto[]>('/api/park').subscribe(res => this.parks = res)
  }

}
