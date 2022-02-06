import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import 'jquery';
import { MonthlyDataService } from '../../services/monthly-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'monthly-nep',
  templateUrl: './nep.component.html',
  styleUrls: ['./nep.component.css'],
})
export class NepMonthlyComponent implements OnInit {

  baseUrl = environment.baseUrl
  selected_month: any='';
  selected_year:any='';

  allMonths:any;
  allYears:any;

  allMonthlyNep:any;


  constructor(
    private _datePipe: DatePipe,
    public _router: Router,
    private _monthly: MonthlyDataService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllMonths();
    this.getAllYearsNep();
   this.getCurrentNep();
   
   
  }

  getAllMonths(){
    this._monthly.getAllMonthsNep().subscribe({
      next:(x:any)=>{
        this.allMonths = x.monthsNepali;
      },
      error:(e:any)=>{
        console.log(e);
        
      },
      complete:()=>{}
    });
  }

  getCurrentNep(){
    let temp:any;
    this._monthly.getCurrentNep().subscribe({
      next:(x:any)=>{
        console.log(x);
        temp = x;
      },
      error:(e:any)=>{
        console.log(e);
      },
      complete:()=>{
        this.selected_month = temp.nepali_month_value;
        this.selected_year = temp.nepali_year_value;
        this.getMonthlyNepByDate();
      }
    })
  }

  getAllYearsNep(){
   
    this._monthly.getAllYearsNep().subscribe({
      next:(x:any)=>{
        this.allYears = x.yearsNepali;
      },
      error:(e:any)=>{
        console.log(e);
      },
      complete:()=>{
    
       }
    });
   
    
  }

  onMonthChange(e: any){
    this.selected_month = e.target.value;
    this.getMonthlyNepByDate();
  }
  onYearChange(e: any){
    this.selected_year = e.target.value;
    this.getMonthlyNepByDate();
  }

  getMonthlyNepByDate(){
    this._monthly.getByDateNep(this.selected_year, this.selected_month).subscribe({
      next:(x:any)=>{
        this.allMonthlyNep = x.horoscopeMonthly;
      },
      error:(e:any)=>{
        console.log(e);
        
      },
      complete:()=>{
        console.log(this.allMonthlyNep);
        (<any>$('.modal')).modal('hide');
      }
    });
  }

  openSnackBar($event:any) {
    this._snackBar.open($event.message, 'close', {
      duration: 4 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  
}
