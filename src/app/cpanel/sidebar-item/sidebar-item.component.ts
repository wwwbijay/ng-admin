import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sidebar-item',
  templateUrl: './sidebar-item.component.html',
  styleUrls: ['./sidebar-item.component.css']
})
export class SidebarItemComponent implements OnInit {
  @Input()  itemTitle: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
