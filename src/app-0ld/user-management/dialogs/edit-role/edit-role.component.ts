import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userRoleServices } from '../../user-roles/user-roles.service';

@Component({
  selector: 'dialog-edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent implements OnInit {

  submitted = false;
  submitted_success = false;
  submitted_msg:string = '';

  selectedRoleId:any;
  selectedRole:any;

  editRoleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required]),
  });
  get roleName() {
    return this.editRoleForm.get('roleName');
  }

  constructor(private _roleservice:userRoleServices) { }

  ngOnInit(): void {
  }
  assignRole(id:any){
    let sel_role:any;
    this.selectedRoleId = id;
    this._roleservice.getRoleById(id).subscribe({
      next:(x:any)=>{
        sel_role = x.role;
      },
      error:(err:any)=>{
        //console.log(err);
      },
      complete:()=>{
        this.editRoleForm.setValue({
          roleName: sel_role.roleName
        });
      }
    });
  }
  editRole(){
    let roleName = this.editRoleForm.value.roleName;
    let data = {
      roleId: this.selectedRoleId,
      roleName: roleName
      }

    this._roleservice.update(this.selectedRoleId, data).subscribe({
      next: (x:any)=> {
        this.submitted = true;
        this.submitted_success = true;
        this.submitted_msg = 'New Role Created Successfully!';
      },
      error:(err:any)=>{
        this.submitted = true;
        this.submitted_msg = "Couldn't Create Role. Error: " + err.message;
      },
      complete:()=>{
        
      }
    });

  }

}
