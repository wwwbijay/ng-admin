import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'dialog-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Input() userToEdit: any;

  constructor() { }

  ngOnInit(): void {}

}
