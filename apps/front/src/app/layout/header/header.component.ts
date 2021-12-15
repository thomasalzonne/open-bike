import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageUserDto } from '@open-bike/lib';
import { BehaviorSubject, Subject } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'open-bike-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() transparent: boolean = false;
  $user: BehaviorSubject<ManageUserDto | null>
  constructor(private authService: AuthService) { 
    this.$user = authService.user
  }

  ngOnInit(): void {
  }

}
