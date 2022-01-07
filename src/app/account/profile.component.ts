import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { IUserDetails } from './IUserDetails';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: IUserDetails ={
    fullName: '',
    userName: '',
    address: '',
    email: '',
    roles: '',
    phoneNumber: '',
    gender: '',
    dateOfBirth: '',
    department: ''
  };
  testCurrentuser: any;


  constructor(private http: HttpClient, private userservice: UserService) { }
  

  ngOnInit(): void {
    var mytoken = this.userservice.getToken();
    var username = this.userservice.getUserByToken(mytoken) || 'sorry';
   
    this.userservice.getUserByUsername(username).subscribe({
      next: (data) => {
        this.testCurrentuser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => { 
        this.currentUser = this.testCurrentuser;
      }
     });
  }



}
