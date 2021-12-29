import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cpanel',
  templateUrl: './cpanel.component.html',
  styleUrls: ['./cpanel.component.css']
})

export class CpanelComponent implements OnInit {

  constructor(public router: Router) { }
  openNav: boolean = true;
  ngOnInit(): void {
  }
  /* Set the width of the side navigation to 250px */
  toggleSideNav() {
    this.openNav = !this.openNav;
  }

}
