import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sign } from '../../interfaces/sign';
import { SignsDataService } from '../../services/signs-data.service';

@Component({
  selector: 'manage-table',
  templateUrl: './manage-table.component.html',
  styleUrls: ['./manage-table.component.css']
})
export class ManageTableComponent implements OnInit {
  allsigns: any;

  constructor(private signsData: SignsDataService, private route: Router) {
    this.getSigns()
   }
  ngOnInit(): void {
  }

  getSigns(){
    this.signsData.getItems().subscribe(data => {
      this.allsigns = data;
    });
  }

  deleteSigns(id:number){
    console.log(id)
    this.signsData.deleteItem(id).subscribe(data => {
      alert("deleted Zodiac Sign successfully!");
    }
    );
   
    this.getSigns();
  }

}
