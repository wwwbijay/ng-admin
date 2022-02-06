import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MonthlyDataService } from '../../services/monthly-data.service';

@Component({
  selector: 'dialog-delete-monthly-nep',
  templateUrl: './delete-monthly-nep.component.html',
  styleUrls: ['./delete-monthly-nep.component.css']
})
export class DeleteMonthlyNepComponent implements OnInit {

  selectedId!:any;
  @Output() getMonthlyNepByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();
  constructor(private _monthly: MonthlyDataService) { }

  ngOnInit(): void {
  }

  assignAll(id:any){
    this.selectedId = id;
  }

  confirmDelete(){
    this._monthly.deleteNep(this.selectedId).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
      },
      error:(err:any)=>{
        console.log(err);
        this.openSnackBar.emit({message: err.message});
      },
      complete:()=>{
        this.getMonthlyNepByDate.emit();
      }
    });
  }

}
