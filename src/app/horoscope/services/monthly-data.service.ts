import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class MonthlyDataService {
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

  getAllMonthsNep(): Observable<any>{
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/get-months-nepali',
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
        '/api/HoroscopeDetailsMonthly/get-horoscopedetails-monthly_nepali-list',
      this.options
    );
  }
  getByDateNep(year: any, month: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/get-horoscopedetails-monthly-nepali-by-year-month?year=' +
        year +
        '&month=' +
        month,
      this.options
    );
  }
  getByIdNep(id: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/get-horoscopedetails-monthly-nepali-by-id?Id=' +
        id,
      this.options
    );
  }
  addNep(data: any): Observable<any> {
    return this.http.post(
      baseUrl + '/api/HoroscopeDetailsMonthly/add-horoscopedetails-monthly-nepali',
      data,
      this.options
    );
  }
  updateNep(data: any): Observable<any> {
    return this.http.put(
      baseUrl + '/api/HoroscopeDetailsMonthly/update-horoscopedetails-monthly-nepali',
      data,
      this.options
    );
  }
  deleteNep(id: number): Observable<any> {
    return this.http.delete(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/delete-horoscopedetails-monthly-nepali?Id=' +
        id,
      this.options
    );
  }

  // English Monthly API

  // To get all the monthly horoscope by date in English
  getByDateEng(year: any, month: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/get-horoscopedetails-monthly-english-by-year-month?year=' +
        year +
        '&month=' +
        month,
      this.options
    );
  }

  // To display all the months
  getAllMonthsEng(): Observable<any> {
    return this.http.get(
      baseUrl + '/api/HoroscopeDetailsMonthly/get-months-english',
      this.options
    );
  }

  // To display all the Years
  getAllYearEng(): Observable<any> {
    return this.http.get(
      baseUrl + '/api/HoroscopeDetailsMonthly/get-years-english',
      this.options
    );
  }

  // Add new monthly
  addEng(data: any): Observable<any> {
    return this.http.post(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/add-horoscopedetails-monthly-english',
      data,
      this.options
    );
  }

  // Edit New Monthly
  updateEng(data: any): Observable<any> {
    return this.http.put(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/update-horoscopedetails-monthly-english',
      data,
      this.options
    );
  }

  // Delete New Monthly
  deleteEng(id: number): Observable<any> {
    return this.http.delete(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/delete-horoscopedetails-monthly-english?Id=' +
        id,
      this.options
    );
  }

  //to get monthly data by id
  getEngById(id: any): Observable<any> {
    return this.http.get(
      baseUrl +
        '/api/HoroscopeDetailsMonthly/get-horoscopedetails-monthly-english-by-id?Id=' +
        id,
      this.options
    );
  }
}
