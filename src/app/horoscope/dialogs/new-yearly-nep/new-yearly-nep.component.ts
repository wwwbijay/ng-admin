import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SignsDataService } from '../../services/signs-data.service';
import { YearlyDataService } from '../../services/yearly-data.service';

@Component({
  selector: 'dialog-new-yearly-nep',
  templateUrl: './new-yearly-nep.component.html',
  styleUrls: ['./new-yearly-nep.component.css']
})
export class NewYearlyNepComponent implements OnInit {

  baseUrl = environment.baseUrl;
  nepDesc!: string;

  selectedSignId!: number;
  selectedSignImage: any;

  allSigns: any;
  allYears:any;

  @Input() selected_year: any;
  @Output() getYearlyNepByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  addYearlyNepForm = new FormGroup({
    horoscopeId: new FormControl('', Validators.required),
  });
  get horoscopeId() {
    return this.addYearlyNepForm.get('horoscopeId');
  }

  constructor(
    private _signs: SignsDataService,
    private _yearly:YearlyDataService
  ) { }

  ngOnInit(): void {
    this.getAllYearsNep();
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
  getAllYearsNep(){
    this._yearly.getAllYearsNep().subscribe({
      next:(x:any)=>{
        this.allYears = x.yearsNepali;
      },
      error:(e:any)=>{
        console.log(e);
      },
      complete:()=>{ }
    });
  }
  yearChanged(e:any){
    this.selected_year = e;    
  }

  addYearlyNep(){
    let data = {
      horoscopeId: this.addYearlyNepForm.value.horoscopeId,
      horoscopeYearNepali: this.selected_year,
      horoscopeDescriptionNepali: this.nepDesc,
    };
    this._yearly.addNep(data).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
       },
      error:(err:any)=>{
        this.openSnackBar.emit({message: err.message});
      },
      complete:()=>{
        this.getYearlyNepByDate.emit();
      }
    });
  }

  

}
