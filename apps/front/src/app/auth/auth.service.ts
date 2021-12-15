import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ManageUserDto } from '@open-bike/lib';
import { BehaviorSubject, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token?: string;
  user = new BehaviorSubject<null | ManageUserDto>(null);
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.setToken(localStorage.getItem('token')!)
    }
  }

  login(email: string, password: string) {
    return this.http.post<{ token: string }>('/api/auth/login', { email, password }).pipe(
      map(res => this.setToken(res.token))
    )
  }

  register(email: string, password: string) {
    return this.http.post('/api/auth/register', { email, password })
  }

  setToken(token: string) {
    this.token = token
    localStorage.setItem('token', token)
    this.me()
  }

  me() {
    this.http.get<ManageUserDto>('/api/auth/me').subscribe((res) => {
      this.user.next(res)
    })
  }
}
