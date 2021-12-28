import { Component, OnInit } from '@angular/core';
import { dataSource } from './sidemenu.datasource';

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  datas: any[] = dataSource;
  
  constructor() { 
   }

  ngOnInit(): void {
      // this.href = this.router.url;
      // console.log(this.router.url);
      // this.router.events.subscribe((event) => {       
      //   event instanceof NavigationEnd ? ( this.href = event.url ): null     
      // });
   }

}
