import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ManageUserDto } from '@open-bike/lib';

@Component({
  selector: 'open-bike-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: ManageUserDto[] = []
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<ManageUserDto[]>('/api/user').subscribe((res) => this.users = res)
  }

  delete(id: number) {
    this.http.delete('/api/user/' + id).subscribe(() => {})
  }

}
