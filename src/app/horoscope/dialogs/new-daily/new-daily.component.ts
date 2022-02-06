import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DailyDataService } from '../../services/daily-data.service';
import { SignsDataService } from '../../services/signs-data.service';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-new-daily',
  templateUrl: './new-daily.component.html',
  styleUrls: ['./new-daily.component.css'],
})
export class NewDailyComponent implements OnInit {

  loader: boolean = false;
  baseUrl = environment.baseUrl;
  nepDesc!: string;
  engDesc!: string;
  selectedSignId!: number;
  selectedSignImage: any;
  submitted: boolean = false;
  allSigns: any;
  @Input() selected_date: any;
  @Output() getDailyByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();
  
  addDailyForm = new FormGroup({
    horoscopeId: new FormControl('', Validators.required),
  });
  get horoscopeId() {
    return this.addDailyForm.get('horoscopeId');
  }

  constructor(
    private _signs: SignsDataService,
    private _dailyservice: DailyDataService,
    private _datePipe: DatePipe
  ) { }

  ngOnInit(): void { }
  
  assignAllSigns() {
    this.engDesc = '';
    this.nepDesc = '';
   
    this._signs.getAll().subscribe({
      next: (x: any) => {
        this.allSigns = x;
        // console.log(this.allSigns);
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {},
    });
  }

  signselector(signId: number, signImage: any) {
    this.selectedSignId = signId;
    this.selectedSignImage = this.baseUrl + signImage;
  }

  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }
  descNepChange(e: any) {
    this.nepDesc = e.editor.getData();
  }

  dateChanged(e: any) {
    this.selected_date = e;
  }
 
  addDaily() {
    let formatted_date = this._datePipe.transform(this.selected_date,"yyyy-MM-dd");
    let data = {
      horoscopeId: this.addDailyForm.value.horoscopeId,
      horoscopeDateEnglish: formatted_date,
      horoscopeDescriptionEnglish: this.engDesc,
      horoscopeDescriptionNepali: this.nepDesc,
    };
    console.log(data);
    
    this._dailyservice.add(data).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: appMessages.added});
       },
      error:(err:any)=>{
        this.openSnackBar.emit({message: appMessages.addError});
      },
      complete:()=>{
        this.getDailyByDate.emit();
      }
    });

  }
}
