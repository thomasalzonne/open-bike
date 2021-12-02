import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post('/api/auth/login', { email, password })
  }

  register(email: string, password: string) {
    return this.http.post('/api/auth/register', { email, password })
  }
}
