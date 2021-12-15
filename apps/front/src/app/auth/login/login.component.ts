import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'open-bike-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  submit() {
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.authService.login(email, password).subscribe();
  }

  change($event: any) {
    this.form.patchValue({[$event.target.name]: $event.target.value})
  }

}
