import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DailyDataService } from '../services/daily-data.service';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-weekly',
  templateUrl: './update-weekly.component.html',
  styleUrls: ['./update-weekly.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class UpdateWeeklyComponent implements OnInit {

  selected_date!: Date;
  //formatted_date:any;
  selectedWeekStart!:Date;
  selectedWeekEnd!:Date;
  constructor(
    private _daily: DailyDataService,
    private _datePipe: DatePipe
  ) {
    this.selected_date = new Date();
    //this.formatted_date = _datePipe.transform(this.selected_date,"yyyy-MM-dd");
    this.selectedWeekStart = this.startOfWeek(this.selected_date);
    this.selectedWeekEnd = this.endofweek(this.selected_date);
   }

  ngOnInit(): void {
    console.log(this.selected_date.getDay());
   }

  startOfWeek(date:any) {  
    var diff = date.getDate() - date.getDay() ;  
    return new Date(date.setDate(diff));
  }
  endofweek(date:any) {  
    var lastday = date.getDate() - date.getDay()  + 6;  
    return new Date(date.setDate(lastday));  
  }  
  dateChanged(e:any){
    this.selected_date = e;
    this.selectedWeekStart = this.startOfWeek(this.selected_date);
    this.selectedWeekEnd = this.endofweek(this.selected_date);
    this.getWeeklyByDate();
  }
  getWeeklyByDate(){

  }

}
