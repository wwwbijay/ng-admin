import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SignsDataService } from '../../services/signs-data.service';



@Component({
  selector: 'dialog-new-daily',
  templateUrl: './new-daily.component.html',
  styleUrls: ['./new-daily.component.css']
})
export class NewDailyComponent implements OnInit{

  baseUrl = environment.baseUrl;

  selectedSignId!:number;
  selectedSignImage:any;
  submitted:boolean = false;
  allSigns:any;
  @Input() selected_date:any;

  addDailyForm = new FormGroup({
    horoscopeId: new FormControl(''),
    HoroscopeNameEnglish:  new FormControl(''),
    HoroscopeSubTitleEnglish:  new FormControl(''),
    HoroscopeNameNepali:  new FormControl('',[Validators.required]),
    HoroscopeSubTitleNepali:  new FormControl(''),
    image: new FormControl('',[Validators.required]),
  });

  constructor(private _signs:SignsDataService) { }

  ngOnInit(): void {
    this.assignAllSigns();
 }
  assignAllSigns(){
    this._signs.getAll().subscribe({
      next: (x:any)=>{
        this.allSigns = x;
        console.log(this.allSigns);
       },
      error:(e:any)=>{
        console.log("Error:"+e);
      },
      complete:()=>{
        
      }
    });
  }

  signselector(signId:number, signImage:any){
    this.selectedSignId = signId;
    this.selectedSignImage = this.baseUrl + signImage;
  }

  addDaily(){

  }
}
