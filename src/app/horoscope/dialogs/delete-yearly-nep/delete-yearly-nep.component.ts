import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YearlyDataService } from '../../services/yearly-data.service';

@Component({
  selector: 'dialog-delete-yearly-nep',
  templateUrl: './delete-yearly-nep.component.html',
  styleUrls: ['./delete-yearly-nep.component.css']
})
export class DeleteYearlyNepComponent implements OnInit {
  selectedId!:any;
  @Output() getYearlyNepByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();
  constructor(
    private _yearly: YearlyDataService
  ) { }

  ngOnInit(): void { }
  assignAll(id:any){
    this.selectedId = id;
  }
  confirmDelete(){
    this._yearly.deleteNep(this.selectedId).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
        this.getYearlyNepByDate.emit();
      },
      error:(err:any)=>{
        console.log(err);
        this.openSnackBar.emit({message: err.message});
        this.getYearlyNepByDate.emit();
      },
      complete:()=>{
      
      }
    });
  }

}
