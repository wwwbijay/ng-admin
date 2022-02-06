import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { YearlyDataService } from '../../services/yearly-data.service';

@Component({
  selector: 'dialog-delete-yearly-eng',
  templateUrl: './delete-yearly-eng.component.html',
  styleUrls: ['./delete-yearly-eng.component.css']
})
export class DeleteYearlyEngComponent implements OnInit {

  selectedId!:any;
  @Output() getYearlyEngByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();
  constructor(
    private _yearly: YearlyDataService
  ) { }

  ngOnInit(): void {}

  assignAll(id:any){
    this.selectedId = id;
  }

  confirmDelete(){
    this._yearly.deleteEng(this.selectedId).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
        this.getYearlyEngByDate.emit();
      },
      error:(err:any)=>{
        console.log(err);
        this.openSnackBar.emit({message: err.message});
        this.getYearlyEngByDate.emit();
      },
      complete:()=>{      
      }
    });
  }

}
