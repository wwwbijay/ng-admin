import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserDetails } from 'src/app/interfaces/IUserDetails';
import { userManageServices } from '../user-manage.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  allUsers!: [IUserDetails];
  testCurrentuser: any;
  constructor(public router: Router, private userservices:userManageServices) { }

  ngOnInit(): void {
    this.userservices.getAllUsers().subscribe({
      next: (data) => {
        this.testCurrentuser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => { 
        this.allUsers = this.testCurrentuser.users;

      }
     });
  }

}
