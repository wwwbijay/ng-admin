import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'recently-used',
  templateUrl: './recently-used.component.html',
  styleUrls: ['./recently-used.component.css']
})
export class RecentlyUsedComponent implements OnInit {

  @Input()  itemTitle: string = '';
  

  constructor() { }

  ngOnInit(): void {
  }

}
