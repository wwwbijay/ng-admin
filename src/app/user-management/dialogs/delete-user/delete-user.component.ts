import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { userManageServices } from '../../services/user-manage.service';
// import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'dialog-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  @Input() public userIdToDelete: any;

  @Input() public usertodelete: any;
  @Output("listAllUsers") listAllUsers: EventEmitter<any> = new EventEmitter();

  constructor(
    private _userservice: userManageServices,
    // private _modalService: NgbModal,
    // public _modal: NgbActiveModal
  ) { }
  ngOnInit(): void {
    this.userIdToDelete = this.usertodelete;
  }

  deleteUser(id: any) {
    this.userIdToDelete = id;
  }
  confirmDelete() {
    this._userservice.deleteUserById(this.userIdToDelete).subscribe({
      next: (x) => {
        console.log("User" + x + " Deleted");
      },
      error: (err) => {
        console.log("Error" + err);
      },
      complete: () => {
        this.listAllUsers.emit();
        // document.getElementById('deleteModalClose')?.click();
      }

    });

  }

}
