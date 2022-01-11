import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRoles } from 'src/app/interfaces/IRoles';

import { userManageServices } from '../../user-manage.service';

@Component({
  selector: 'dialog-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  submitted: boolean = false;
  submitted_success: boolean = false;
  submitted_msg: string = '';

  @Input() allRoleLists: IRoles[] = [];
  @Output("listAllUsers") listAllUsers: EventEmitter<any> = new EventEmitter();

  createUserForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
     Validators.minLength(6),
   ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    gender: new FormControl(''),
    mobile: new FormControl(''),
    phone: new FormControl(''),
    dob: new FormControl(''),
    address: new FormControl(''),
    department: new FormControl(''),
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

  constructor(private _userservices: userManageServices) { }

  ngOnInit(): void {
  }
  uploadFile(e:any){
    const target = e.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];

    this.createUserForm.patchValue({
      avatar: file
    });
    this.createUserForm.value.avatar.updateValueAndValidity();
  }

  /************
   * Create User Method Starts
   */
   createUser(): void {
    
    var formData: any = new FormData();
    formData.append("fullName", this.createUserForm.value.fullname || '');
    formData.append("userName", this.createUserForm.value.username || '');
    formData.append("password", this.createUserForm.value.password || '');
    formData.append("confirmPassword", this.createUserForm.value.confirmPassword || '');
    formData.append("email", this.createUserForm.value.email || '');
    formData.append("phoneNumber", this.createUserForm.value.phoneNumber || '');
    formData.append("mobileNumber", this.createUserForm.value.mobileNumber || '');
    formData.append("address", this.createUserForm.value.address || '');
    formData.append("gender", this.createUserForm.value.gender || '');
    formData.append("dateOfBirth", this.createUserForm.value.dateOfBirth || '');
    formData.append("department", this.createUserForm.value.department || '');
    formData.append("profileImagePath", this.createUserForm.value.avatar || '');
    // formData.append("roles", myroles );

    this.allRoleLists.filter( role => {
      if(role.isselected === true){
        formData.append("roles", role.name);
      }
    });

    this._userservices.addNewUser(formData).subscribe({
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
        this.listAllUsers.emit();
        this.createUserForm.reset();
      },
    });
  }

/************
   * Create User Method Ends
*/

}
