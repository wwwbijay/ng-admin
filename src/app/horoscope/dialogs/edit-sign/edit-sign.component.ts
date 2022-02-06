import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { SignsDataService } from '../../services/signs-data.service';
import { appMessages } from 'src/app/messages.config';

@Component({
  selector: 'dialog-edit-sign',
  templateUrl: './edit-sign.component.html',
  styleUrls: ['./edit-sign.component.css']
})
export class EditSignComponent implements OnInit {
  baseUrl = environment.baseUrl;
  submitted: boolean = false;
  symbol:any;
  symbolPath:any;
  @Output("getAllSigns") getAllSigns: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  selectedId:any;
  selectedSign={
    horoscopeNameEnglish:  '',
    horoscopeSubTitleEnglish:  '',
    horoscopeNameNepali:  '',
    horoscopeSubTitleNepali:  '',
    horoscopeImagePath:  '',
  };

  editSignForm = new FormGroup({
    HoroscopeNameEnglish:  new FormControl(''),
    HoroscopeSubTitleEnglish:  new FormControl(''),
    HoroscopeNameNepali:  new FormControl(''),
    HoroscopeSubTitleNepali:  new FormControl(''),
    image:  new FormControl(''),
  });
  
  get image(){
    return this.editSignForm.get('image');
  }

  constructor(private _signs:SignsDataService) { }

  ngOnInit(): void { }
 
  uploadFile(e:any){
    if (e.target.files.length > 0) {
      this.symbol = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload= (event:any)=>{
        this.symbolPath=event.target.result;
      }
    }
  }
  assignSign(id:any){
    this.submitted = false;
    this.selectedId = id;
    let temp:any;
    this._signs.getById(id).subscribe({
      next:(x:any)=>{
        temp = x;
      },
      error:(err:any)=>{
        console.log("cannot get sign by id:"+err);
      },
      complete:()=>{
        this.selectedSign = temp;
        this.symbolPath = this.baseUrl + this.selectedSign.horoscopeImagePath;
        this.editSignForm.setValue({
          HoroscopeNameEnglish:  this.selectedSign.horoscopeNameEnglish,
          HoroscopeSubTitleEnglish:  this.selectedSign.horoscopeSubTitleEnglish,
          HoroscopeNameNepali:  this.selectedSign.horoscopeNameNepali,
          HoroscopeSubTitleNepali: this.selectedSign.horoscopeSubTitleNepali,
          image: ''
        });
        console.log(this.selectedSign);
      }
    });
  }

  editSign(){
    let formData: any = new FormData();
    formData.append("id", this.selectedId);
    formData.append("horoscopeNameEnglish", this.editSignForm.value.HoroscopeNameEnglish || '');
    formData.append("horoscopeSubTitleEnglish", this.editSignForm.value.HoroscopeSubTitleEnglish || '');
    formData.append("horoscopeNameNepali", this.editSignForm.value.HoroscopeNameNepali || '');
    formData.append("horoscopeSubTitleNepali", this.editSignForm.value.HoroscopeSubTitleNepali || '');
    formData.append("horoscopeImage", this.symbol || this.selectedSign.horoscopeImagePath);

    this._signs.update(formData).subscribe({
        next: (x: number) =>{
           console.log('next value: ' + x);
           this.openSnackBar.emit({message: appMessages.updated});
          },
        error: (err: Error) => {
          console.error('Error:'+err.message);
          this.openSnackBar.emit({message: appMessages.updateError});
          this.getAllSigns.emit();
        },
        complete: () => {
          // this.submitted = true;
          this.getAllSigns.emit();
          //this.createSignForm.reset(this.createSignForm.value);
        },
      });
  }

}
