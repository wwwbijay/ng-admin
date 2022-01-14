import { Component, OnInit } from '@angular/core';
import { userManageServices } from '../../user-manage.service';

@Component({
  selector: 'dialog-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  userIdToDelete:any;
  constructor(private _userservice: userManageServices) { }

  ngOnInit(): void {
  }

  deleteUser(id:any){
    this.userIdToDelete = id;
  }
  confirmDelete(){
    this._userservice.deleteUserById(this.userIdToDelete).subscribe({
      next:(x) =>{
        console.log("User"+x+" Deleted");
      },
      error:(err) =>{
        console.log("Error"+err);
      },
      complete:()=>{}

    });

  }

}
