import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { YearlyDataService } from '../../services/yearly-data.service';

@Component({
  selector: 'dialog-edit-yearly-nep',
  templateUrl: './edit-yearly-nep.component.html',
  styleUrls: ['./edit-yearly-nep.component.css']
})
export class EditYearlyNepComponent implements OnInit {
  baseUrl = environment.baseUrl;
  nepDesc!: string;

  selectedSignId: any;
  selectedSignImage: any;
  selected_id:any;

  selectedYearlyNep:any;

  allSigns: any;

  @Input() selected_year: any;
  @Output() getYearlyNepByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  editYearlyNepForm = new FormGroup({ });
  constructor(
    private _yearly:YearlyDataService
  ) { }

  ngOnInit(): void {}

  descNepChange(e: any) {
    this.nepDesc = e.editor.getData();
  }

  assignAll(id:any){
    this.selected_id = id;
    let temp:any;
    this._yearly.getByIdNep(id).subscribe({
      next: (x: any) => {
        temp = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {
        this.selectedYearlyNep = temp.horoscope;
        console.log(this.selectedYearlyNep);
        this.selectedSignImage = this.baseUrl + this.selectedYearlyNep.horoscopeImagePath
        this.nepDesc = this.selectedYearlyNep.horoscopeDescriptionNepali;
        this.selectedSignId = this.selectedYearlyNep.horoscopeId
      },
    });
  }


  editYearlyNep(){
    let data = {
      id: this.selected_id,
      horoscopeId: this.selectedYearlyNep.horoscopeId,
      horoscopeYearNepali: this.selected_year,
      horoscopeDescriptionNepali: this.nepDesc,
    };
    this._yearly.updateNep(data).subscribe({
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
