import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { MonthlyDataService } from '../../services/monthly-data.service';
import { SignsDataService } from '../../services/signs-data.service';
import 'jquery';

@Component({
  selector: 'dialog-new-monthly-eng',
  templateUrl: './new-monthly-eng.component.html',
  styleUrls: ['./new-monthly-eng.component.css'],
})
export class NewMonthlyEngComponent implements OnInit {
  baseUrl = environment.baseUrl;
  selectedSignImage: any;
  engDesc!: string;
  allSigns: any;
  loader: boolean = false;

  @Input() selected_month: any;
  @Input() selected_year: any;
  @Output() getMonthlyEngByDate: EventEmitter<any> = new EventEmitter();
  @Output('openSnackBar') openSnackBar: EventEmitter<any> = new EventEmitter();

  addMonthlyForm = new FormGroup({
    horoscopeId: new FormControl('', Validators.required),
  });
  Engyear: any;
  Engmonth: any;

  get horoscopeId() {
    return this.addMonthlyForm.get('horoscopeId');
  }

  constructor(
    private _signs: SignsDataService,
    private _datePipe: DatePipe,
    private _monthly: MonthlyDataService
  ) {}

  ngOnInit(): void {}

  // To get all the horoscope names through select
  assignAllSigns() {
    this.engDesc = '';

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

  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }

  addMonthly() {
    this.loader = true;
    let data = {
      horoscopeId: this.addMonthlyForm.value.horoscopeId,
      horoscopeYearEnglish: String(this.selected_year),
      horoscopeMonthValueEnglish: String(this.selected_month),
      horoscopeDescriptionEnglish: this.engDesc,
    };
    console.log(data);
    this._monthly.addEng(data).subscribe({
      next: (x: any) => {
        this.openSnackBar.emit({ message: x.message });
        this.getMonthlyEngByDate.emit();
        this.loader = false;
      },
      error: (err: any) => {
        console.log(err);
        this.openSnackBar.emit({ message: err.message });
        this.getMonthlyEngByDate.emit();
        this.loader = false;
      },
      complete: () => {
        this.getMonthlyEngByDate.emit();
        // console.log(this.getMonthlyByDate);
      },
    });
  }
}
