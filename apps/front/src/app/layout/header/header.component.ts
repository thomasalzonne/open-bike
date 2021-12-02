import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'open-bike-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() transparent: boolean = false;
  constructor() { }

  ngOnInit(): void {
    console.log(this.transparent)
  }

}
