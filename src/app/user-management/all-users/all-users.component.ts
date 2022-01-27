import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { IUserDetails } from '../../interfaces/IUserDetails';
import {IRoles} from '../../interfaces/IRoles'

import { userManageServices } from '../user-manage.service';
import { environment } from 'src/environments/environment';
//import { DeleteUserComponent } from '../dialogs/delete-user/delete-user.component';
//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'jquery';

import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  
  baseUrl=environment.baseUrl;
  page: number = 1;
  loader:boolean= true;
  allUsers:any;
  allRoleLists: IRoles[] = [];
  submitted: boolean = false;
  submitted_success: boolean = false;
  submitted_msg: string = '';

  constructor(
    public _router: Router,
    private _userservices: userManageServices,
    private _snackBar: MatSnackBar
    //private _modalService: NgbModal,
    // public _modal: NgbActiveModal
  ) {}
  
  ngOnInit(): void {
    this.listAllRoles();
    this.listAllUsers();
  }

  openSnackBar(msg:string) {
    this._snackBar.open(msg,'close',{
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3*1000 ,
    });
  }

  listAllUsers() {
    let testCurrentuser:any;
    this.loader = true;
    this._userservices.getAllUsers().subscribe({
      next: (data) => {
        testCurrentuser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        this.allUsers = testCurrentuser.users;
        this.loader = false;
        (<any>$('.modal')).modal('hide');
        this.openSnackBar("Success!");
      },
    });
  }

  listAllRoles() {
    let allroles:any;
    this._userservices.getAllRoles().subscribe({
      next: (data) => {
        allroles = data;
       // console.log(allroles);
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        allroles.roles.forEach((data: { roleName: any }) =>{
            var i=1;
            var RoleObject: IRoles = {
              rid: i++,
              name: data.roleName,
              isselected: false
            };
            this.allRoleLists.push( RoleObject );  
         });
        //  console.log(this.allRoleLists);
      },
    });

  }
  
}



@Component({
  selector: 'snack-bar-component-example-snack',
  template: `<span class="example-pizza-party">
              Pizza party!!! 🍕
             </span>
            `,
  styles: [
    `
    .example-pizza-party {
      color: hotpink;
    }
  `,
  ],
})
export class PizzaPartyComponent {}


