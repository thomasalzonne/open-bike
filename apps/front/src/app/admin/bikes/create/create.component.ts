import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'open-bike-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      stationId: ['', Validators.required]
    })
  }

  submit() {
    this.http.post('/api/bike', this.form.value)
    console.log(this.form.value)
  }

  change($event: any) {
    this.form.patchValue({[$event.target.name]: $event.target.value})
  }

}
