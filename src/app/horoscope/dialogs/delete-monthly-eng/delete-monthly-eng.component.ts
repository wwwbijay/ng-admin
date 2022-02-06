import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { MonthlyDataService } from '../../services/monthly-data.service';
import { appMessages } from 'src/app/messages.config';


@Component({
  selector: 'dialog-delete-monthly-eng',
  templateUrl: './delete-monthly-eng.component.html',
  styleUrls: ['./delete-monthly-eng.component.css']
})
export class DeleteMonthlyEngComponent implements OnInit {

  selectedId!:number;
  @Output() getMonthlyEngByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  constructor(private _monthly: MonthlyDataService) { }

  ngOnInit(): void {
  }

  assignAll(id:any){
    this.selectedId = id;
  }

  confirmDelete(){
    this._monthly.deleteEng(this.selectedId).subscribe({
      next:()=>{
        this.openSnackBar.emit({message: appMessages.deleted});
      },
      error:(err:any)=>{
        this.openSnackBar.emit({message: appMessages.deleteError});
      },
      complete:()=>{
        this.getMonthlyEngByDate.emit();
      }
    });
  }

}
