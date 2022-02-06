import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { YearlyDataService } from '../../services/yearly-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-yearly-eng',
  templateUrl: './eng.component.html',
  styleUrls: ['./eng.component.css']
})
export class EngYearlyComponent implements OnInit {

  baseUrl = environment.baseUrl;
  selected_date!: Date;
  selected_year:any;
  allYearlyEng:any;
  allYears:any;

  constructor(
    private _datePipe: DatePipe,
    public _router: Router,
    private _yearly: YearlyDataService,
    private _snackbar: MatSnackBar
  ) {
    this.getCurrentYearEng();
  }

  ngOnInit(): void {
    this.getAllYearsEng();
  }

  getCurrentYearEng(){
    let temp:any;
    this._yearly.getCurrentNep().subscribe({
      next:(x:any)=>{
        temp = x;
      },
      error:(e:any)=>{
        console.log(e);
      },
      complete:()=>{
        this.selected_year = temp.english_year;
        this.getYearlyEngByDate();
      }
    })
  }

  getYearlyEngByDate(){
    this._yearly.getByDateEng(this.selected_year).subscribe({
      next:(x:any)=>{
        this.allYearlyEng = x.horoscopeDetailsYearlyEnglish;
      },
      error:(e:any)=>{
        console.log(e);
      },
      complete:()=>{
        console.log(this.allYearlyEng);
        (<any>$('.modal')).modal('hide');
      }
    });
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

  onYearChange(e: any){
    this.selected_year = e.target.value;
    this.getYearlyEngByDate();
  }

  openSnackBar($event:any) {
    this._snackbar.open($event.message, 'close', {
      duration: 4 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

}
