import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class SignsDataService {
  headers = new HttpHeaders({
    'Authorization':`Bearer ${this.getToken()}` 
    });
  options = { headers: this.headers };

  constructor(private http: HttpClient) { }

  getToken(){
    return localStorage.getItem('token');
  }
  getAll(): Observable<any> {
    return this.http.get(baseUrl+'/api/HoroscopeMaster/get-horoscope_list',this.options);
  }
  getById(id:any): Observable<any> {
    return this.http.get(baseUrl+'/api/HoroscopeMaster/get-horoscope-by-id?Id='+id,this.options);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl+'/api/HoroscopeMaster/add-horoscope', data, this.options);
  }

  update(data: any): Observable<any> {
    return this.http.put(baseUrl+'/api/HoroscopeMaster/update-horoscope', data, this.options);
  }

  delete(id:number): Observable<any> {
    return this.http.delete(baseUrl+'/api/HoroscopeMaster/delete-horoscope?Id='+id, this.options);
  }

 

}
