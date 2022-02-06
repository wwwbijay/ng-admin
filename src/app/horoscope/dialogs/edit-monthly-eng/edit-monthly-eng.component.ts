import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MonthlyDataService } from '../../services/monthly-data.service';
import { SignsDataService } from '../../services/signs-data.service';
import { appMessages } from 'src/app/messages.config';


@Component({
  selector: 'dialog-edit-monthly-eng',
  templateUrl: './edit-monthly-eng.component.html',
  styleUrls: ['./edit-monthly-eng.component.css']
})
export class EditMonthlyEngComponent implements OnInit {

  baserUrl = environment.baseUrl;
  allSigns: any;
  engDesc: any;
  selectedId!: number;
  selectedMonthly: any;
  selectedSignImage: any;

  @Input() selected_month: any;
  @Input() selected_year: any;
  @Output() getMonthlyEngByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();
  constructor(
    private _signs: SignsDataService,
    private _monthly: MonthlyDataService
  ) { }

  ngOnInit(): void {}

  editMonthlyForm = new FormGroup({
    horoscopeId: new FormControl(''),
  });

  getAllSigns() {
    this._signs.getAll().subscribe({
      next: (x: any) => {
        this.allSigns = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => { },
    });
  }

  assignAll(id: number) {
    this.selectedId = id;
    this.getAllSigns();

    let temp: any;
    this._monthly.getEngById(id).subscribe({
      next: (x: any) => {
        temp = x;
        console.log(x);
        
      },
      error: (e: any) => {
        console.log(e);
      },
      complete: () => {
        this.selectedMonthly = temp.horoscope;
        this.engDesc = this.selectedMonthly.horoscopeDescriptionEnglish;
        this.selectedSignImage = this.baserUrl + this.selectedMonthly.horoscopeImagePath
      },
    });
  }

  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }

  editMonthly(){
    let data = {
      id: this.selectedId,
      horoscopeId: this.selectedMonthly.horoscopeId,
      horoscopeYearEnglish: this.selectedMonthly.
      horoscopeYearEnglish,
      horoscopeMonthValueEnglish: this.selectedMonthly.horoscopeMonthValueEnglish,
      horoscopeDescriptionEnglish: this.engDesc
    };

    this._monthly.updateEng(data).subscribe({
      next: (x: any) => {
        this.openSnackBar.emit({message: appMessages.updated});
      },
      error: (err: any) => {
        this.openSnackBar.emit({message: appMessages.updateError});
      },  
      complete: () => {
        this.getMonthlyEngByDate.emit();
      }
    })
  }
}
