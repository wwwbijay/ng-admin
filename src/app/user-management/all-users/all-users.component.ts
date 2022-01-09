import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDetails } from 'src/app/interfaces/IUserDetails';
import {IRoles} from 'src/app/interfaces/IRoles';

import { userManageServices } from '../user-manage.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css'],
})
export class AllUsersComponent implements OnInit {
  allUsers!: [IUserDetails];
  testCurrentuser: any;
  selectedUser!: IUserDetails;
  allRoles!: any;
 
  allRoleLists: IRoles[] = [];
  

  submitted: boolean = false;
  submitted_success: boolean = false;
  submitted_msg: string = '';

  createUserForm = new FormGroup({
    myfullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    mobile: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    dob: new FormControl(''),
  });

  get myfullname() {
    return this.createUserForm.get('myfullname');
  }
  get email() {
    return this.createUserForm.get('email');
  }
  get mobile() {
    return this.createUserForm.get('mobile');
  }
  get username() {
    return this.createUserForm.get('username');
  }

  constructor(
    public _router: Router,
    private _userservices: userManageServices,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.listAllRoles();
    this.listAllUsers();
  }

  listAllUsers() {
    this._userservices.getAllUsers().subscribe({
      next: (data) => {
        this.testCurrentuser = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        this.allUsers = this.testCurrentuser.users;
      },
    });
  }

  listAllRoles() {
    
    this._userservices.getAllRoles().subscribe({
      next: (data) => {
        this.allRoles = data;
      },
      error: (err: Error) => {
        alert('Error:' + err);
      },
      complete: () => {
        this.allRoles.roles.forEach((data: { roleName: any }) =>{
            var i=1;
            var RoleObject: IRoles = {
              rid: i++,
              name: data.roleName,
              isselected: false
            };
            this.allRoleLists.push( RoleObject );  
         });
         console.log(this.allRoleLists);

      },
    });

  }


  onRolesChange(event:any){
    console.log(this.allRoleLists);
    
  }

  createUser(): void {
    this.selectedUser = {
      fullName: this.createUserForm.value.myfullname || '',
      userName: this.createUserForm.value.username || '',
      address: this.createUserForm.value.address || '',
      email: this.createUserForm.value.email || '',
      phoneNumber: this.createUserForm.value.phone || '',
      mobileNumber: this.createUserForm.value.mobile || '',
      gender: this.createUserForm.value.gender || '',
      dateOfBirth: this.createUserForm.value.dob || '',
      department: this.createUserForm.value.department || '',
      roles: this.createUserForm.value.roles || [],
    };

    console.log(this.createUserForm.value);

    this._userservices.addNewUser(this.selectedUser).subscribe({
      next: (x: number) => {
        this.submitted = true;
        this.submitted_success = true;
        this.submitted_msg = 'New User Created Successfully!';
        console.log(x);
      },
      error: (err: Error) => {
        this.submitted = true;
        this.submitted_msg = "Sorry! Couldn't Add User.";
      },
      complete: () => {
        this.listAllUsers();
      },
    });
  }
}


