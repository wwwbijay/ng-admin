import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DailyDataService } from '../../services/daily-data.service';

@Component({
  selector: 'dialog-delete-daily',
  templateUrl: './delete-daily.component.html',
  styleUrls: ['./delete-daily.component.css']
})
export class DeleteDailyComponent implements OnInit {

  selectedId!:number;
  @Output() getDailyByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  constructor(private _daily:DailyDataService) { }

  ngOnInit(): void {
  }

  assignAll(id:any){
    this.selectedId = id;
  }

  confirmDelete(){
    this._daily.delete(this.selectedId).subscribe({
      next:()=>{
        this.openSnackBar.emit({message: 'Deleted Successfully!'});
      },
      error:(err:any)=>{
        this.openSnackBar.emit({message: 'Sorry! Couldnot Delete.'});
      },
      complete:()=>{
        this.getDailyByDate.emit();
      }
    });
  }

}
