import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SignsDataService } from '../../services/signs-data.service';
import { WeeklyDataService } from '../../services/weekly-data.service';

@Component({
  selector: 'dialog-edit-weekly',
  templateUrl: './edit-weekly.component.html',
  styleUrls: ['./edit-weekly.component.css']
})
export class EditWeeklyComponent implements OnInit {

  baserUrl = environment.baseUrl;
  engDesc: any;
  nepDesc: any;
  allSigns: any;
  selectedSignImage: any;
  selectedWeekly: any;
  selectedId!: number;
  @Input() selected_date: any;
  @Input() selected_week: any;
  @Output() getWeeklyByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  constructor(
    private _signs: SignsDataService,
    private _weekly: WeeklyDataService,
  ) { }

  ngOnInit(): void {  }
  editWeeklyForm = new FormGroup({
    horoscopeId: new FormControl(''),
  });

  getAllSigns() {
    this._signs.getAll().subscribe({
      next: (x: any) => {
        this.allSigns = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => { },
    });
  }

  assignAll(id: number) {
    this.selectedId = id;
    this.getAllSigns();

    let temp: any;
    this._weekly.getById(id).subscribe({
      next: (x: any) => {
        temp = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {
        this.selectedWeekly = temp.horoscope;
        console.log(this.selectedWeekly);
        
        this.engDesc = this.selectedWeekly.horoscopeDescriptionEnglish;
        this.nepDesc = this.selectedWeekly.horoscopeDescriptionNepali;
        this.selectedSignImage = this.baserUrl + this.selectedWeekly.horoscopeImagePath
      },
    });

  }

  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }
  descNepChange(e: any) {
    this.nepDesc = e.editor.getData();
  }

  editWeekly() {

    let data = {
      id: this.selectedId,
      horoscopeId: this.selectedWeekly.horoscopeId,
      horoscopeDateEnglish: this.selectedWeekly.horoscopeDateEnglish,
      horoscopeDescriptionEnglish: this.engDesc,
      horoscopeDescriptionNepali: this.nepDesc
    };
    console.log(data);
    

    this._weekly.update(data).subscribe({
      next: (x: any) => {
        this.openSnackBar.emit({message: x.message});
        this.getWeeklyByDate.emit();
      },
      error: (err: any) => {
        this.openSnackBar.emit({message: err.message});
        this.getWeeklyByDate.emit();
      },
      complete: () => {
       
      }
    });

  }

}
