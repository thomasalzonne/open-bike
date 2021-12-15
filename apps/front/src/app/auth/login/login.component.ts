import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'open-bike-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  constructor(private http: HttpClient) {
    this.loginForm = new FormGroup({
      username : new FormControl(''),
      password : new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  submit() {
    console.log(this.loginForm.value)
    // this.http.post('/api/auth/login', this.formGroup.value).subscribe((response) => {
    //   console.log(response)
    // })
  }

}
