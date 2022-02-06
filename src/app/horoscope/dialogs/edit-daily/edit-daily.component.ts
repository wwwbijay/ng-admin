import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DailyDataService } from '../../services/daily-data.service';
import { SignsDataService } from '../../services/signs-data.service';
import * as jQuery from 'jquery';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-edit-daily',
  templateUrl: './edit-daily.component.html',
  styleUrls: ['./edit-daily.component.css']
})
export class EditDailyComponent implements OnInit {
  baserUrl = environment.baseUrl;
  engDesc: any;
  nepDesc: any;
  allSigns: any;
  selectedSignImage: any;
  selectedDaily: any;
  selectedId!: number;
  @Input() selected_date: any;
  @Output() getDailyByDate: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  editDailyForm = new FormGroup({
    horoscopeId: new FormControl(''),
  });



  constructor(
    private _signs: SignsDataService,
    private _daily: DailyDataService,
  ) { }

  ngOnInit(): void {
  }
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
    this._daily.getById(id).subscribe({
      next: (x: any) => {
        temp = x;
      },
      error: (e: any) => {
        console.log('Error:' + e);
      },
      complete: () => {
        this.selectedDaily = temp.horoscope;

        this.engDesc = this.selectedDaily.horoscopeDescriptionEnglish;
        this.nepDesc = this.selectedDaily.horoscopeDescriptionNepali;
        this.selectedSignImage = this.baserUrl + this.selectedDaily.horoscopeImagePath
      },
    });

  }
  descEngChange(e: any) {
    this.engDesc = e.editor.getData();
  }
  descNepChange(e: any) {
    this.nepDesc = e.editor.getData();
  }

  editDaily() {

    let data = {
      id: this.selectedId,
      horoscopeId: this.selectedDaily.horoscopeId,
      horoscopeDateEnglish: this.selectedDaily.horoscopeDateEnglish,
      horoscopeDescriptionEnglish: this.engDesc,
      horoscopeDescriptionNepali: this.nepDesc
    };


    this._daily.update(data).subscribe({
      next: (x: any) => {
        this.openSnackBar.emit({message: appMessages.updated});
      },
      error: (err: any) => {
        this.openSnackBar.emit({message: appMessages.updateError});
      },
      complete: () => {
        this.getDailyByDate.emit();
      }
    });

  }


}
