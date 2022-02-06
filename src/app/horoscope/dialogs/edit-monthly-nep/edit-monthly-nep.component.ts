import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MonthlyDataService } from '../../services/monthly-data.service';
import { SignsDataService } from '../../services/signs-data.service';

@Component({
  selector: 'dialog-edit-monthly-nep',
  templateUrl: './edit-monthly-nep.component.html',
  styleUrls: ['./edit-monthly-nep.component.css']
})
export class EditMonthlyNepComponent implements OnInit {

  baseUrl = environment.baseUrl;
  nepDesc!: string;

  selectedSignId: any;
  selectedSignImage: any;
  selected_id:any;

  selectedMonthlyNep:any;

  allSigns: any;
  @Input() selected_month: any;
  @Input() selected_year: any;
  @Output() getMonthlyNepByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  editMonthlyNepForm = new FormGroup({
    
  });
 

  constructor(
    private _signs: SignsDataService,
    private _monthly:MonthlyDataService
  ) { }

  ngOnInit(): void {
    this.assignAllSigns();
  }

  assignAllSigns() {
    this.nepDesc = '';
   
    this._signs.getAll().subscribe({
      next: (x: any) => {
        this.allSigns = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {},
    });
  }

  descNepChange(e: any) {
    this.nepDesc = e.editor.getData();
  }

  assignAll(id:any){
    this.selected_id = id;
    this.assignAllSigns();
    let temp:any;
    this._monthly.getByIdNep(id).subscribe({
      next: (x: any) => {
        temp = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {
        this.selectedMonthlyNep = temp.horoscope;
        console.log(this.selectedMonthlyNep);
        this.nepDesc = this.selectedMonthlyNep.horoscopeDescriptionNepali;
        this.selectedSignId = this.selectedMonthlyNep.horoscopeId
      },
    });
  }

  editMonthlyNep(){
    let data = {
      id: this.selected_id,
      horoscopeId: this.selectedMonthlyNep.horoscopeId,
      horoscopeYearNepali: this.selected_year,
      horoscopeMonthValueNepali: this.selected_month,
      horoscopeDescriptionNepali: this.nepDesc,
    };
    this._monthly.updateNep(data).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
       },
      error:(err:any)=>{
        this.openSnackBar.emit({message: err.message});
      },
      complete:()=>{
        this.getMonthlyNepByDate.emit();
      }
    });
  }

}
