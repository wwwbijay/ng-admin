import { Component, OnInit } from '@angular/core';
import {
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
  allUsers: any;
  testCurrentuser: any;
  selectedUser!: IUserDetails;
  allRoles!: any;
 
  allRoleLists: IRoles[] = [];
  

  submitted: boolean = false;
  submitted_success: boolean = false;
  submitted_msg: string = '';


  constructor(
    public _router: Router,
    private _userservices: userManageServices
  ) {}

  createUserForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
     Validators.minLength(5),
   ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    mobile: new FormControl('', [Validators.required]),
    phone: new FormControl(''),
    dob: new FormControl(''),
    roles: new FormControl([])
  } );

 

  get fullName() {
    return this.createUserForm.get('fullName');
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
  get password() {
    return this.createUserForm.get('password');
  }
  get confirmPassword() {
    return this.createUserForm.get('confirmedPassword');
  }

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
        //  console.log(this.allRoleLists);

      },
    });

  }


  // onRolesChange(event:any){
  //   console.log(this.allRoleLists);
  //   console.log(event.target.value.name);
  // }

  /************
   * Create User Method Starts
   */
  createUser(): void {
    var myroles: string[] = [];
    this.allRoleLists.filter( role => {
      if(role.isselected === true){
        myroles.push(role.name);
      }
    });


    console.log(myroles);

    this.selectedUser = {
      fullName: this.createUserForm.value.fullname || '',
      userName: this.createUserForm.value.username || '',
      address: this.createUserForm.value.address || '',
      email: this.createUserForm.value.email || '',
      password: this.createUserForm.value.password || '',
      confirmPassword: this.createUserForm.value.confirmPassword || '',
      phoneNumber: this.createUserForm.value.phone || '',
      mobileNumber: this.createUserForm.value.mobile || '',
      gender: this.createUserForm.value.gender || '',
      dateOfBirth: this.createUserForm.value.dob || '',
      department: this.createUserForm.value.department || '',
      profileImagePath: this.createUserForm.value.profileImagePath || '',
      isActive: this.createUserForm.value.isActive || true,
      roles: myroles
    };

    console.log(this.selectedUser);

    this._userservices.addNewUser(this.selectedUser).subscribe({
      next: (x: number) => {
        this.submitted = true;
        this.submitted_success = true;
        this.submitted_msg = 'New User Created Successfully!';
        console.log(x);
      },
      error: (err: Error) => {
        this.submitted = true;
        this.submitted_msg = "Couldn't Create User. Error: " + err.message;
        console.log(err);
      },
      complete: () => {
        this.listAllUsers();
      },
    });
  }

/************
   * Create User Method Ends
*/









}


