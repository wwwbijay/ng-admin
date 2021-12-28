import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  @Input() openNav!: Boolean;
  @Output() openSideNavFromChild= new EventEmitter();
  
  constructor(private router: Router) { }

  ngOnInit(): void {}

  openFromChild(){
    this.openSideNavFromChild.emit();
  }

  signout(){
    alert('signout');
    this.router.navigate(['/login']);
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
  }

}



