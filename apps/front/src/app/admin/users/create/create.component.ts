import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ManageUserDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.minLength(2)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    role: new FormControl('', [Validators.required])
  });

  editId?: number;

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    route.params.subscribe(r => {
      if (r.id) {
        this.editId = r.id
        this.http.get<ManageUserDto>('/api/user/' + this.editId).subscribe((response) => {
          this.form.patchValue(response)
        })
      }
    })
  }

  submit() {
    if (!this.editId) {
      this.http.post('/api/user', this.form.value).subscribe()
    }
    else {
      this.http.patch('/api/user/' + this.editId, this.form.value).subscribe()
    }
  }

  change($event: any) {
    this.form.patchValue({ [$event.target.name]: $event.target.value })
  }


}
