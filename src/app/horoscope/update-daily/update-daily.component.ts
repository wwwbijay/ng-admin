import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { DailyDataService } from '../services/daily-data.service';
import 'jquery';

@Component({
  selector: 'app-update-daily',
  templateUrl: './update-daily.component.html',
  styleUrls: ['./update-daily.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class UpdateDailyComponent implements OnInit {
  selected_date!: Date;
  formatted_date:any;
  alldaily:any;

  constructor(
    private _daily: DailyDataService,
    private _datePipe: DatePipe
  ) {
    this.selected_date = new Date();
    this.formatted_date = _datePipe.transform(this.selected_date,"yyyy-MM-dd");
  }

  ngOnInit(): void {
    this.getDailyByDate();
  }
  dateChanged(e:any){
    this.selected_date = e;
    this.getDailyByDate();
  }
  getDailyByDate() {
    let seldate = this._datePipe.transform(this.selected_date,"yyyy-MM-dd");
    let data:any;
    this._daily.getByDate(seldate).subscribe({
      next:(x:any)=>{
        data = x;
      },
      error:(e:any)=>{
        console.log("Get Error:"+e);
      },
      complete:()=>{
        this.alldaily = data.horoscopeDetailsDaily;
        (<any>$('.modal')).modal('hide');
      }
    });
  }

}
