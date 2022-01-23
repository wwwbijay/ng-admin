import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class DailyDataService {
  headers = new HttpHeaders({
    'Authorization':`Bearer ${this.getToken()}` 
    });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getToken(){
    return localStorage.getItem('token');
  }
  getAll(): Observable<any> {
    return this.http.get(baseUrl+'/api/HoroscopeDetailsDaily/get-horoscopedetails-daily_list',this.options);
  }
  getByDate(date:any): Observable<any> {
    return this.http.get(baseUrl+'/api/HoroscopeDetailsDaily/get-horoscopedetails-daily-by-date?dDate='+date,this.options);
  }
  getById(id:any): Observable<any> {
    return this.http.get(baseUrl+'/api/HoroscopeDetailsDaily/get-horoscopedetails-daily-by-id?Id='+id,this.options);
  }
  add(data: any): Observable<any> {
    return this.http.post(baseUrl+'/api/HoroscopeDetailsDaily/add-horoscopedetails-daily', data, this.options);
  }
  update(data: any): Observable<any> {
    return this.http.put(baseUrl+'/api/HoroscopeDetailsDaily/update-horoscopedetails-daily', data, this.options);
  }
  delete(id:number): Observable<any> {
    return this.http.delete(baseUrl+'/api/HoroscopeDetailsDaily/delete-horoscopedetails-daily?Id='+id, this.options);
  }

}
