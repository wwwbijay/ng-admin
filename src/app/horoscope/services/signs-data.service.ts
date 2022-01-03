import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SignsDataService {
  url = "http://localhost:3000/signs";
  constructor(private http: HttpClient) { }
  
  getItems(){
    return this.http.get(this.url);
  }
  deleteItem(id: number){
    return this.http.delete(this.url+'/'+id);
  }
}
