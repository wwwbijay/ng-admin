import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SignsDataService } from './services/signs-data.service';
import { Sign } from './interfaces/sign';
import { ManageTableComponent } from './layout/manage-table/manage-table.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  
})
export class DashboardComponent implements OnInit {
  @ViewChild(ManageTableComponent) manageTblCmp:ManageTableComponent | undefined;
  submitted = false;
  createSignForm = new FormGroup({
    id:  new FormControl('',[Validators.required, Validators.max(12)]),
    title:  new FormControl('',[Validators.required]),
    subtitle:  new FormControl('',[Validators.required]),
    image:  new FormControl('',[Validators.required]),
  });

  
  get id(){
    return this.createSignForm.get('id');
  }
  get title(){
    return this.createSignForm.get('title');
  }
  get subtitle(){
    return this.createSignForm.get('subtitle');
  }

  constructor( public router: Router, private signsDataServices: SignsDataService ) { }
  ngOnInit(): void { }
  createSignClicked(){
    this.submitted = false;
  }
  addSign(): void{
    
    
    const data = {
      id:  this.createSignForm.value.id,
      title:  this.createSignForm.value.title,
      subtitle:  this.createSignForm.value.subtitle,
      image:  this.createSignForm.value.image,
    };

    this.signsDataServices.create(data)
      .subscribe({
        next: (x: number) => console.log('Observer got a next value: ' + x),
        error: (err: Error) => console.error('Observer got an error: ' + err),
        complete: () => {
          this.manageTblCmp?.getAllSigns();
          this.submitted = true;
          this.createSignForm.reset(this.createSignForm.value);
        },
      });

      this.createSignForm.reset();
  }



}
