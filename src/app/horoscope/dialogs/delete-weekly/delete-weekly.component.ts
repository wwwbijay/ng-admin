import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { WeeklyDataService } from '../../services/weekly-data.service';


@Component({
  selector: 'dialog-delete-weekly',
  templateUrl: './delete-weekly.component.html',
  styleUrls: ['./delete-weekly.component.css']
})
export class DeleteWeeklyComponent implements OnInit {

  selectedId!:number;
  @Output() getDailyByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();
  constructor( private _weekly:WeeklyDataService) { }

  ngOnInit(): void {
  }

  assignAll(id:any){
    this.selectedId = id;
  }

  confirmDelete(){
    this._weekly.delete(this.selectedId).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
      },
      error:(err:any)=>{
        this.openSnackBar.emit({message: err.message});
      },
      complete:()=>{
        this.getDailyByDate.emit();
      }
    });

  }
}
