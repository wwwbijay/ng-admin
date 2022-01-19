import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-update-daily',
  templateUrl: './update-daily.component.html',
  styleUrls: ['./update-daily.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class UpdateDailyComponent implements OnInit {

  selected_date!: Date;

  constructor(private calendar: NgbCalendar) {
    this.selected_date = new Date();
  }

  ngOnInit(): void { }

}
