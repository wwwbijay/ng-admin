import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-yearly',
  templateUrl: './update-yearly.component.html',
  styleUrls: ['./update-yearly.component.css'],
  providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
})
export class UpdateYearlyComponent implements OnInit {

  selected_date!:Date;
  constructor(private _datePipe: DatePipe) { 
    this.selected_date = new Date();
  }

  ngOnInit(): void {
  }
  dateChanged(e:any){}

}
