import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { YearlyDataService } from '../../services/yearly-data.service';

@Component({
  selector: 'app-yearly-nep',
  templateUrl: './nep.component.html',
  styleUrls: ['./nep.component.css']
})
export class NepYearlyComponent implements OnInit {

  selected_date!:Date;
  allYearlyNep:any;
  allYears:any;
  selected_year:any;
  baseUrl = environment.baseUrl;

  constructor(
    private _datePipe: DatePipe,
    public _router: Router,
    private _yearly: YearlyDataService,
    private _snackBar: MatSnackBar
  ) { 
    this.getCurrentYearNep();
  }

  ngOnInit(): void {
   
    this.getAllYearsNep();
  }

  getCurrentYearNep(){
    let temp:any;
    this._yearly.getCurrentNep().subscribe({
      next:(x:any)=>{
        temp = x;
      },
      error:(e:any)=>{
        console.log(e);
      },
      complete:()=>{
        this.selected_year = temp.nepali_year_value;
        this.getYearlyNepByDate();
      }
    })
  }

  getYearlyNepByDate(){
    this._yearly.getByDateNep(this.selected_year).subscribe({
      next:(x:any)=>{
        this.allYearlyNep = x.horoscopeDetailsYearlyNepali;
        (<any>$('.modal')).modal('hide');
        console.log(this.allYearlyNep );
        
      },
      error:(e:any)=>{
        console.log(e);
        (<any>$('.modal')).modal('hide');
      },
      complete:()=>{
       
      }
    });
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

  onYearChange(e: any){
    this.selected_year = e.target.value;
    this.getYearlyNepByDate();
  }

  openSnackBar($event:any) {
    this._snackBar.open($event.message, 'close', {
      duration: 4 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

}
