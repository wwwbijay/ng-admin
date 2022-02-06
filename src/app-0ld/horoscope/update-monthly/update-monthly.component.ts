import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-monthly',
  templateUrl: './update-monthly.component.html',
  styleUrls: ['./update-monthly.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class UpdateMonthlyComponent implements OnInit {

  selected_date!:Date;
  constructor(private _datePipe: DatePipe) { 
    this.selected_date = new Date();
  }

  ngOnInit(): void {
  }

  dateChanged(e:any){}


}
