import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userRoleServices } from './user-roles.service';


@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {

  allRoles!: any;
  testRoles: any;
  constructor(public router: Router, private _roleservices:userRoleServices) { }

  ngOnInit(): void {
    this._roleservices.getAllRoles().subscribe({
      next: (data) => {
        this.testRoles = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => { 
        this.allRoles = this.testRoles.roles;
      }
     });
  }

}
