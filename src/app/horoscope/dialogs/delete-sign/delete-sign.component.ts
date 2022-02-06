import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SignsDataService } from '../../services/signs-data.service';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-delete-sign',
  templateUrl: './delete-sign.component.html',
  styleUrls: ['./delete-sign.component.css']
})
export class DeleteSignComponent implements OnInit {
  selectedId:any;
  constructor(private _sign:SignsDataService) { }

  @Output("getAllSigns") getAllSigns: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
  }
  assignId(id:any){
    this.selectedId = id;
  }
  confirmDelete(){
    this._sign.delete(this.selectedId).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: appMessages.deleted});
      },
      error:(err:any)=>{
        this.openSnackBar.emit({message: appMessages.deleteError});
        this.getAllSigns.emit();
      },
      complete:()=>{
        this.getAllSigns.emit();
      }
    })

  }

}
