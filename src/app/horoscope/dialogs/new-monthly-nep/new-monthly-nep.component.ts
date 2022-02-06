import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MonthlyDataService } from '../../services/monthly-data.service';
import { SignsDataService } from '../../services/signs-data.service';

@Component({
  selector: 'dialog-new-monthly-nep',
  templateUrl: './new-monthly-nep.component.html',
  styleUrls: ['./new-monthly-nep.component.css']
})
export class NewMonthlyNepComponent implements OnInit {
  baseUrl = environment.baseUrl;
  nepDesc!: string;
  loader:boolean=false;
  selectedSignId!: number;
  selectedSignImage: any;

  allSigns: any;
  @Input() selected_month: any;
  @Input() selected_year: any;
  @Output() getMonthlyNepByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  addMonthlyNepForm = new FormGroup({
    horoscopeId: new FormControl('', Validators.required),
  });
  get horoscopeId() {
    return this.addMonthlyNepForm.get('horoscopeId');
  }

  constructor(
    private _signs: SignsDataService,
    private _monthly:MonthlyDataService
  ) { }

  ngOnInit(): void {
  }

  assignAllSigns() {
    this.nepDesc = '';
   
    this._signs.getAll().subscribe({
      next: (x: any) => {
        this.allSigns = x;
        // console.log(this.allSigns);
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

  addMonthlyNep(){
    this.loader = true;
    let data = {
      horoscopeId: this.addMonthlyNepForm.value.horoscopeId,
      horoscopeYearNepali: this.selected_year,
      horoscopeMonthValueNepali: this.selected_month,
      horoscopeDescriptionNepali: this.nepDesc,
    };
    this._monthly.addNep(data).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
        this.getMonthlyNepByDate.emit();
        this.loader = false;
        
       },
      error:(err:any)=>{
        console.log(err.error.message);
        this.openSnackBar.emit({message: err.message});
        this.getMonthlyNepByDate.emit();
        this.loader = false;
      },
      complete:()=>{
        
      }
    });
  }

}
