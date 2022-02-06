import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class YearlyDataService {
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`,
  });
  options = { headers: this.headers };

  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('token');
  }
  getCurrentNep(): Observable<any>{
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/get-current-nepali-year-month',
      this.options
    );
  }

  getAllYearsNep(): Observable<any>{
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/get-years-nepali',
      this.options
    );
  }
  getAllNep(): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsYearly/get-horoscopedetails-yearly-nepali-list',
      this.options
    );
  }
  getByDateNep(year: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsYearly/get-horoscopedetails-yearly-nepali-list-by-year?year=' +
        year,
      this.options
    );
  }
  getByIdNep(id: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsYearly/get-horoscopedetails-yearly-nepali-by-id?Id=' +
        id,
      this.options
    );
  }
  addNep(data: any): Observable<any> {
    return this.http.post(
      baseUrl + '/api/HoroscopeDetailsYearly/add-horoscopedetails-yearly-nepali',
      data,
      this.options
    );
  }
  updateNep(data: any): Observable<any> {
    return this.http.put(
      baseUrl + '/api/HoroscopeDetailsYearly/update-horoscopedetails-yearly-nepali',
      data,
      this.options
    );
  }
  deleteNep(id: number): Observable<any> {
    return this.http.delete(
      baseUrl +
        '/api/HoroscopeDetailsYearly/delete-horoscopedetails-yearly-nepali?Id=' +
        id,
      this.options
    );
  }

  // Eng Yearly API
    
  getAllYearsEng(): Observable<any>{
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsYearly/get-years-english',
      this.options
    );
  }

  getAllEng(): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsYearly/get-horoscopedetails-yearly-english-list',
      this.options
    );
  }

  getByDateEng(year: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsYearly/get-horoscopedetails-yearly-english-list-by-year?year=' +
        year,
      this.options
    );
  }

  getByIdEng(id: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsYearly/get-horoscopedetails-yearly-english-by-id?Id=' +
        id,
      this.options
    );
  }

  // TO ADD YEARLY HOROSCOPE
  addEng(data: any): Observable<any> {
    return this.http.post(
      baseUrl + '/api/HoroscopeDetailsYearly/add-horoscopedetails-yearly-english',
      data,
      this.options
    );
  }

  // TO EDIT YEARLY HOROSCOPE
  updateEng(data: any): Observable<any> {
    return this.http.put(
      baseUrl + '/api/HoroscopeDetailsYearly/update-horoscopedetails-yearly-english',
      data,
      this.options
    );
  }
  
  // TO DELETE YEARLY HOROSCOPE
  deleteEng(id: number): Observable<any> {
    return this.http.delete(
      baseUrl +
        '/api/HoroscopeDetailsYearly/delete-horoscopedetails-yearly-english?Id='+
        id,
      this.options
    );
  }  
}
