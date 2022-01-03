import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignsDataService } from './services/signs-data.service';
import { Sign } from './interfaces/sign';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  allsigns: any;
  constructor( public router: Router ) { 
    
  }

  ngOnInit(): void {
  }

}
