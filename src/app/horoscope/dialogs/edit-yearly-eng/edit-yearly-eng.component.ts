import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { YearlyDataService } from '../../services/yearly-data.service';

@Component({
  selector: 'dialog-edit-yearly-eng',
  templateUrl: './edit-yearly-eng.component.html',
  styleUrls: ['./edit-yearly-eng.component.css']
})
export class EditYearlyEngComponent implements OnInit {

  baseUrl = environment.baseUrl;
  engDesc!: string;
  selectedSignId: any;
  selectedSignImage: any;
  selected_id:any;
  allSigns: any;
  selectedYearlyEng:any;

  @Input() selected_year: any;
  @Output() getYearlyEngByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  editYearlyEngForm = new FormGroup({ });

  constructor(
    private _yearly:YearlyDataService
  ) { }

  ngOnInit(): void {
  }

  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }

  assignAll(id:any){
    this.selected_id = id;
    let temp:any;
    this._yearly.getByIdEng(id).subscribe({
      next: (x: any) => {
        temp = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {
        this.selectedYearlyEng = temp.horoscope;
        console.log(this.selectedYearlyEng);
        this.selectedSignImage = this.baseUrl + this.selectedYearlyEng.horoscopeImagePath
        this.engDesc = this.selectedYearlyEng.horoscopeDescriptionEnglish;
        this.selectedSignId = this.selectedYearlyEng.horoscopeId
      },
    });
  }

  editYearlyEng(){
    let data = {
      id: this.selected_id,
      horoscopeId: this.selectedYearlyEng.horoscopeId,
      horoscopeYearEnglish: this.selected_year,
      horoscopeDescriptionEnglish: this.engDesc,
    };

    this._yearly.updateEng(data).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
       },
      error:(err:any)=>{
        this.openSnackBar.emit({message: err.message});
      },
      complete:()=>{
        this.getYearlyEngByDate.emit();
      }
    });
  }

}
