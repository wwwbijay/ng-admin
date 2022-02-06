import { Component, OnInit } from '@angular/core';
import { WeeklyDataService } from '../services/weekly-data.service';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-weekly',
  templateUrl: './update-weekly.component.html',
  styleUrls: ['./update-weekly.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class UpdateWeeklyComponent implements OnInit {
  
  baseUrl = environment.baseUrl;
  loader: boolean = false;
  selected_date!: Date;
  selectedRange:any;
  weekTitle:string= 'यो हप्ता';
  allweekly:any;

  constructor(
    private _weekly: WeeklyDataService,
    private _datePipe:DatePipe,
    private _snackBar: MatSnackBar
  ) {
    this.selected_date =  new Date();
   }

  ngOnInit(): void {
    console.log(this.selected_date);
    this.getWeekRange();
    this.getWeeklyByDate();
   }
  
  getWeekRange(){
     let temp:any;
     let formatted_date = this._datePipe.transform(this.selected_date,"yyyy-MM-dd");
    this._weekly.getRangeByDate(formatted_date).subscribe({
      next:(x:any)=>{
        temp = x;
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        this.selectedRange = temp.weekRange.weekRangeNepali;
      }
    });
  }
  getWeeklyByDate(){
    this.loader = true;
    let temp:any;
    let formatted_date = this._datePipe.transform(this.selected_date,"yyyy-MM-dd");
    
    this._weekly.getByDate(formatted_date).subscribe({
      next:(x:any)=>{
        temp = x;
      },
      error:(err:any)=>{
        console.log(err);
      },
      complete:()=>{
        this.allweekly = temp.horoscopeDetailsWaily;
        (<any>$('.modal')).modal('hide');
        this.loader = false;
      }
    });
  }

  dateChanged(e:any){
    this.weekTitle = 'हप्ता';
    this.selected_date = e;
    this.getWeekRange();
    this.getWeeklyByDate();
  }

  openSnackBar($event:any) {
    this._snackBar.open($event.message, 'close', {
      duration: 4 * 1000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }
  
}
