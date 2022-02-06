import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DailyDataService } from '../../services/daily-data.service';
import { SignsDataService } from '../../services/signs-data.service';
import { WeeklyDataService } from '../../services/weekly-data.service';

@Component({
  selector: 'dialog-new-weekly',
  templateUrl: './new-weekly.component.html',
  styleUrls: ['./new-weekly.component.css']
})
export class NewWeeklyComponent implements OnInit {

  baseUrl = environment.baseUrl;
  nepDesc!: string;
  engDesc!: string;
  selectedSignId!: number;
  selectedSignImage: any;
  allSigns: any;

  @Input() selected_week: any;
  @Input() selected_date: any;
  @Output() getWeeklyByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  addWeeklyForm = new FormGroup({
    horoscopeId: new FormControl('', Validators.required),
  });
  get horoscopeId() {
    return this.addWeeklyForm.get('horoscopeId');
  }

  constructor(
    private _signs: SignsDataService,
    private _weekly: WeeklyDataService,
    private _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    
    
  }

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

  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }
  descNepChange(e: any) {
    this.nepDesc = e.editor.getData();
  }
  dateChanged(e:any){
    this.selected_date = e;
    this.getWeekRange();
  }
  getWeekRange(){
    let temp:any;
    let formatted_date = this._datePipe.transform(this.selected_date,"yyyy-MM-dd");
   this._weekly.getRangeByDate(formatted_date).subscribe({
     next:(x:any)=>{
       temp = x;
     },
     error:(err:any)=>{
       console.log(err);
     },
     complete:()=>{
       this.selected_week = temp.weekRange.weekRangeNepali;
     }
   });
 }

  addWeekly(){
    let formatted_date = this._datePipe.transform(this.selected_date,"yyyy-MM-dd");
    let data = {
      horoscopeId: this.addWeeklyForm.value.horoscopeId,
      horoscopeDateEnglish: formatted_date,
      horoscopeDescriptionEnglish: this.engDesc,
      horoscopeDescriptionNepali: this.nepDesc,
    };
    console.log(data);
    this._weekly.add(data).subscribe({
      next:(x:any)=>{
        this.openSnackBar.emit({message: x.message});
       },
      error:(err:any)=>{
        this.openSnackBar.emit({message:err.message});
      },
      complete:()=>{
        this.getWeeklyByDate.emit();
      }
    });

  }

}
