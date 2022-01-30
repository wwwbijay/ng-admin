import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SignsDataService } from '../../services/signs-data.service';

@Component({
  selector: 'dialog-create-sign',
  templateUrl: './create-sign.component.html',
  styleUrls: ['./create-sign.component.css']
})
export class CreateSignComponent implements OnInit {

  submitted = false;
  @Output("getAllSigns") getAllSigns: EventEmitter<any> = new EventEmitter();
  @Output("openSnackBar") openSnackBar: EventEmitter<any> = new EventEmitter();

  symbol:any;
  symbolPath:any;

  createSignForm = new FormGroup({
    HoroscopeNameEnglish:  new FormControl(''),
    HoroscopeSubTitleEnglish:  new FormControl(''),
    HoroscopeNameNepali:  new FormControl('',[Validators.required]),
    HoroscopeSubTitleNepali:  new FormControl(''),
    image:  new FormControl('',[Validators.required]),
  });
  
  get HoroscopeNameNepali(){
    return this.createSignForm.get('HoroscopeNameNepali');
  }
  get image(){
    return this.createSignForm.get('image');
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

  addSign(): void{
    
    let formData: any = new FormData();
    formData.append("horoscopeNameEnglish", this.createSignForm.value.HoroscopeNameEnglish || '');
    formData.append("horoscopeSubTitleEnglish", this.createSignForm.value.HoroscopeSubTitleEnglish || '');
    formData.append("horoscopeNameNepali", this.createSignForm.value.HoroscopeNameNepali || '');
    formData.append("horoscopeSubTitleNepali", this.createSignForm.value.HoroscopeSubTitleNepali || '');
    formData.append("horoscopeImage", this.symbol || '');

    this._signs.create(formData).subscribe({
        next: (x: number) =>{
           console.log('next value: ' + x);
           this.openSnackBar.emit({message: 'Created Successfully!'});
          },
        error: (err: Error) => {
          console.error('Error:'+err.message);
          this.openSnackBar.emit({message: 'Sorry! Couldnot create.'});
        },
        complete: () => {
          // this.submitted = true;
          this.getAllSigns.emit();
          this.createSignForm.reset();
          this.symbolPath = undefined;
        },
      });

     // this.createSignForm.reset();
  }

}
