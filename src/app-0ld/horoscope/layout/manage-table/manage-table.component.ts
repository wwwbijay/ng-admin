import { Component, OnInit } from '@angular/core';
import { SignsDataService } from '../../services/signs-data.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.css']
})
export class ManageTableComponent implements OnInit {
  allsigns$!: Observable<any>;
  onesign = ({
    id: '',
    title: '',
    subtitle: '',
    image: '',
  });
  id!: number;

  edit_submitted = false;

  editSignForm = new FormGroup({
    id:  new FormControl(''),
    title:  new FormControl(''),
    subtitle:  new FormControl(''),
    image:  new FormControl(''),
  });

  constructor(private signsData: SignsDataService) {
    this.getAllSigns()
   }
  ngOnInit(): void {
  }
  get eid(){
    return this.editSignForm.get('id');
  }
  get etitle(){
    return this.editSignForm.get('title');
  }
  get esubtitle(){
    return this.editSignForm.get('subtitle');
  }
  //getSigns START
  getSignsById(id:number){
    // this.signsData.get(id).subscribe(data =>{
    //   this.onesign = data;
    // });
    
  }

  getAllSigns(){
    this.allsigns$ = this.signsData.getAll();
  }
  //getAllSigns END

  //delete START
  btnDeleteClicked(id:number){
    this.id = id;
  }
  deleteSign(){
    this.signsData.delete(this.id).subscribe(data => {
      this.getAllSigns();
    });
  }
  //delete END

  //Edit START
  btnEditClicked(id:number){
    this.getSignsById(id);
  }
  editSign(){
   
  }


}
