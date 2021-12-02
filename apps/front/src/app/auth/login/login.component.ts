import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'open-bike-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    'email': new FormControl(''),
    'password': new FormControl(''),
  })
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  submit() {
    this.http.post('/api/auth/login', this.form.value).subscribe((response) => {
      console.log(response)
    })
  }

}
