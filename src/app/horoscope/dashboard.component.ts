import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignsDataService } from './services/signs-data.service';
import { Observable } from 'rxjs';
import { ISign } from '../interfaces/ISign'
import { environment } from 'src/environments/environment';
import 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  baseUrl = environment.baseUrl;
  loader: boolean = false;

  //@ViewChild(ManageTableComponent) manageTblCmp:ManageTableComponent | undefined;
  submitted = false;
  allsigns$!: Observable<any>;
  onesign!: ISign;

  constructor(public router: Router, private _signs: SignsDataService) { }
  ngOnInit(): void {
    this.loader = true;
    // this.manageTblCmp?.getAllSigns();
    this.getAllSigns();
    this.loader = false;
  }
  createSignClicked() {
    this.submitted = false;
  }
  getAllSigns() {

    this.allsigns$ = this._signs.getAll();
    (<any>$('.modal')).modal('hide');

  }



}
