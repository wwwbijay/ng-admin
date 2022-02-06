import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MonthlyDataService } from '../../services/monthly-data.service';
import 'jquery';

@Component({
  selector: 'monthly-eng',
  templateUrl: './eng.component.html',
  styleUrls: ['./eng.component.css'],
})
export class EngMonthlyComponent implements OnInit { 
  baseUrl = environment.baseUrl;

  selected_date!: Date;
  selected_month: any = '';
  selected_year: any = '';
  allMonths: any;
  allYears: any;
  allMonthlyEng: any;
  constructor(
    private _datePipe: DatePipe,
    public _router: Router,
    private _monthly: MonthlyDataService,
    private _snackBar: MatSnackBar
  ) {
    this.selected_date = new Date();
    
    const d = new Date();
    this.selected_month = d.getMonth() + 1 ;
    this.selected_year = d.getFullYear();  
   
    
  }

  ngOnInit(): void {
    this.getAllMonths();
    this.getAllYearsEng();
    this.getMonthlyEngByDate();
  }

  onMonthChange(e: any) {
    this.selected_month = e.target.value;
    this.getMonthlyEngByDate();
  }

  onYearChange(e: any) {
    this.selected_year = e.target.value;
    this.getMonthlyEngByDate();
  }

  //To display all the months in select
  getAllMonths() {
    this._monthly.getAllMonthsEng().subscribe({
      next: (x: any) => {
        this.allMonths = x.monthsEnglish;
      },
      error: (e: any) => {
        console.log(e);
      },
      complete: () => {},
    });
  }

  // To display all the Years in select
  getAllYearsEng() {
    this._monthly.getAllYearEng().subscribe({
      next: (x: any) => {
        this.allYears = x.yearsEnglish;
      },
      error: (e: any) => {
        console.log(e);
      },
      complete: () => {},
    });
  }

  getMonthlyEngByDate() {
    this._monthly
      .getByDateEng( this.selected_year, this.selected_month)
      .subscribe({
        next: (x: any) => {
          this.allMonthlyEng = x.horoscopeMonthly;
        },
        error: (e: any) => {
          console.log(e);
        },
        complete: () => {
          
          (<any>$('.modal')).modal('hide');
        },
      });
  }

  openSnackBar($event: any) {
    this._snackBar.open($event.message, 'close', {
      duration: 4 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
  // dateChanged(e: any) {}
}
