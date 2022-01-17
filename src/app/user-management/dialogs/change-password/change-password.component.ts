import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userManageServices } from '../../user-manage.service';
import 'jquery';

@Component({
  selector: 'dialog-reset-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  selectedId!:string;

  submitted = false;
  submitted_success = false;
  submitted_msg:string = '';

  resetPasswordForm = new FormGroup({
    rpassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rconfirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });
  get rpassword(){
    return this.resetPasswordForm.get('rpassword');
  }
  get rconfirmPassword(){
    return this.resetPasswordForm.get('rconfirmPassword');
  }

  constructor(
    private _user:userManageServices
  ) { }

  ngOnInit(): void {
  }
  changePassword(id:any){
    this.selectedId = id;
  }
  resetPassword(){
    let data = {
      password: this.resetPasswordForm.value.rpassword,
      confirmPassword: this.resetPasswordForm.value.rconfirmPassword
    }
    this._user.resetPassword(this.selectedId,data).subscribe({
      next:(x:any)=>{
        console.log("password changed successfully");
      },
      error:(err:any)=>{
        console.log("Error:"+err);
      },
      complete:()=>{
        (<any>$('.modal')).modal('hide');
      }
    });

  }
}
