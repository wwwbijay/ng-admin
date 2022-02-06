import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DailyDataService } from '../../services/daily-data.service';
import { SignsDataService } from '../../services/signs-data.service';

@Component({
  selector: 'dialog-new-daily',
  templateUrl: './new-daily.component.html',
  styleUrls: ['./new-daily.component.css'],
})
export class NewDailyComponent implements OnInit {
  baseUrl = environment.baseUrl;
  nepDesc!: string;
  engDesc!: string;
  selectedSignId!: number;
  selectedSignImage: any;
  submitted: boolean = false;
  allSigns: any;
  @Input() selected_date: any;
  formatted_date:any; 
  @Output() getDailyByDate: EventEmitter<any> = new EventEmitter();
  
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
  ) {
   this.formatted_date = _datePipe.transform(this.selected_date,"yyyy-MM-dd");
  }

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

  addDaily() {
    let data = {
      horoscopeId: this.addDailyForm.value.horoscopeId,
      horoscopeDateEnglish: this.selected_date,
      horoscopeDescriptionEnglish: this.engDesc,
      horoscopeDescriptionNepali: this.nepDesc,
    };

    this._dailyservice.add(data).subscribe({
      next:(x:any)=>{ },
      error:(err:any)=>{
        console.log("Error:"+err);
      },
      complete:()=>{
        this.getDailyByDate.emit();
      }
    });

  }
}
