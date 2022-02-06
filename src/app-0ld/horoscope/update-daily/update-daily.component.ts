import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbDateAdapter,
  NgbDateNativeAdapter,
} from '@ng-bootstrap/ng-bootstrap';
import { DailyDataService } from '../services/daily-data.service';
import 'jquery';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-daily',
  templateUrl: './update-daily.component.html',
  styleUrls: ['./update-daily.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class UpdateDailyComponent implements OnInit {
  baseUrl = environment.baseUrl;
  loader: boolean = false;
  selected_date!: Date;
  formatted_date: any;
  alldaily: any;

  allDailyHoroscope = {
    horoscopeDescriptionEnglish: "",
    horoscopeDescriptionNepali: "",
    horoscopeId: null,
    horoscopeImagePath: "",
    horoscopeNameEnglish: "",
    horoscopeNameNepali: "",
  }

  constructor(
    private _daily: DailyDataService,
    private _datePipe: DatePipe
  ) {
    this.selected_date = new Date();
    this.formatted_date = _datePipe.transform(this.selected_date, "yyyy-MM-dd");
  }

  ngOnInit(): void {
    this.getDailyByDate();
  }
  dateChanged(e: any) {
    this.selected_date = e;
    this.getDailyByDate();
  }
  getDailyByDate() {
    this.loader = true;
    let seldate = this._datePipe.transform(this.selected_date, "yyyy-MM-dd");
    let data: any;
    this._daily.getByDate(seldate).subscribe({
      next: (x: any) => {
        data = x;
      },
      error: (e: any) => {
        console.log("Get Error:" + e);
      },
      complete: () => {
        this.alldaily = data.horoscopeDetailsDaily;
        console.log(this.alldaily);
        (<any>$('.modal')).modal('hide');
        this.loader = false;


      }
    });
  }

  getSignById(id: any, dailyItem: any) {
    let temp: any;
    let selectedSignImage: string = '';
    this._daily.getById(id).subscribe({
      next: (x: any) => {
        temp = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {
        selectedSignImage = this.baseUrl + dailyItem.horoscopeImagePath;
      }
    });
    return selectedSignImage;
  }

}
