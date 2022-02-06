import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SignsDataService } from '../../services/signs-data.service';
import { YearlyDataService } from '../../services/yearly-data.service';

@Component({
  selector: 'dialog-new-yearly-eng',
  templateUrl: './new-yearly-eng.component.html',
  styleUrls: ['./new-yearly-eng.component.css']
})
export class NewYearlyEngComponent implements OnInit {

  baseUrl = environment.baseUrl;
  allSigns: any;
  allYears:any;
  engDesc!: string;

  @Input() selected_year: any;
  @Output() getYearlyEngByDate: EventEmitter<any> = new EventEmitter();
  @Output('openSnackBar') openSnackBar: EventEmitter<any> = new EventEmitter();

  addYearlyEngForm = new FormGroup({
    horoscopeId: new FormControl('', Validators.required),
  });

  constructor(
    private _signs: SignsDataService,
    private _yearly: YearlyDataService
  ) {}

  ngOnInit(): void {
    this.getAllYearsEng();
  }

  // To get error message
  get horoscopeId() {
    return this.addYearlyEngForm.get('horoscopeId');
  }

  assignAllSigns() {
    this.engDesc = '';

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

  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }

  getAllYearsEng(){
    this._yearly.getAllYearsEng().subscribe({
      next:(x:any)=>{
        this.allYears = x.yearsEnglish;
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

  addYearlyEng() {
    let data = {
      horoscopeId: this.addYearlyEngForm.value.horoscopeId,
      horoscopeYearEnglish: this.selected_year,
      horoscopeDescriptionEnglish: this.engDesc,
    };
    this._yearly.addEng(data).subscribe({
      next: (x: any) => {
        this.openSnackBar.emit({ message: x.message });
      },
      error: (err: any) => {
        this.openSnackBar.emit({ message: err.message });
      },
      complete: () => {
        this.getYearlyEngByDate.emit();
      },
    });
  }

}
