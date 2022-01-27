import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignsDataService } from './services/signs-data.service';
import { Observable } from 'rxjs';
import {ISign} from '../interfaces/ISign' 
import { environment } from 'src/environments/environment';
import 'jquery';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})

export class DashboardComponent implements OnInit {
  baseUrl = environment.baseUrl;

  //@ViewChild(ManageTableComponent) manageTblCmp:ManageTableComponent | undefined;
  submitted = false;
  allsigns$!: Observable<any>;
  onesign!:ISign;

  constructor( public router: Router, private _signs: SignsDataService, private _snackBar: MatSnackBar ) { }
  ngOnInit(): void {
    // this.manageTblCmp?.getAllSigns();
    this.getAllSigns();
   }
  createSignClicked(){
    this.submitted = false;
  }
  getAllSigns(){
    this.allsigns$ = this._signs.getAll();
    (<any>$('.modal')).modal('hide');
    this.openSnackBar('Success!');
    
  }
  openSnackBar(msg:string) {
    this._snackBar.open(msg,'close',{
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3*1000 ,
    });
  }



}
