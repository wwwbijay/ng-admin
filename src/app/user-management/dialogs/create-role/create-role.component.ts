import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userRoleServices } from '../../user-roles/user-roles.service';

@Component({
  selector: 'dialog-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  submitted = false;
  submitted_success = false;
  submitted_msg:string = '';

  constructor(private _roleservice:userRoleServices ) { }
  createRoleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required]),
  }); 

  get roleName() {
    return this.createRoleForm.get('roleName');
  }

  ngOnInit(): void {
  }

  createRole(){
    var roleName = this.createRoleForm.value.roleName;
    this._roleservice.create(roleName).subscribe({
      next: (x:any)=> {
        this.submitted = true;
        this.submitted_success = true;
        this.submitted_msg = 'New Role Created Successfully!';
      },
      error:(err:any)=>{
        this.submitted = true;
        this.submitted_msg = "Couldn't Create Role. Error: " + err.message;
      },
      complete:()=>{}
    });

  }

}
