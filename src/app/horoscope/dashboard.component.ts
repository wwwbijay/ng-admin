import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignsDataService } from './services/signs-data.service';
import { Observable } from 'rxjs';
import { ISign } from '../interfaces/ISign'
import { environment } from 'src/environments/environment';
import 'jquery';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


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
  allsigns: any;
  onesign!: ISign;

  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  constructor(public router: Router, private _signs: SignsDataService) { }
  ngOnInit(): void {
    // this.manageTblCmp?.getAllSigns();
    this.getAllSigns();
    
  }
  createSignClicked() {
    this.submitted = false;
  }
  getAllSigns() {
    this.loader = true;
    let temp:any;
    this._signs.getAll().subscribe({
      next:(x:any)=>{
        temp = x;
      },
      error(e:any){
        console.log('Error:'+e);
      },
      complete:()=>{
        this.allsigns = temp;
        (<any>$('.modal')).modal('hide');
        this.loader = false;
      }
      
    });
    

  }


  drop(event: CdkDragDrop<string[]>) {
   
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    
  }



}
