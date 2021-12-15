import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ManageParkDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form = new FormGroup({
    name: new FormControl('', [Validators.required])
  });

  editId?: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.params.subscribe(r => {
      if(r.id) {
        this.editId = r.id
        this.http.get<ManageParkDto>('/api/park/' + this.editId).subscribe((response) => {
          this.form.patchValue(response)
        })
      }
    })
  }

  submit() {
    if(!this.editId) {
      this.http.post('/api/park', this.form.value).subscribe()
    }
    else {
      this.http.patch('/api/park/' + this.editId, this.form.value).subscribe()
    }
  }

  change($event: any) {
    this.form.patchValue({[$event.target.name]: $event.target.value})
  }
}
