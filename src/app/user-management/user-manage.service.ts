import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { IUserDetails } from '../interfaces/IUserDetails';



@Injectable({
  providedIn: 'root'
})
export class userManageServices {

  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();

  headers = new HttpHeaders({
    'Authorization':`Bearer ${this.getToken()}` 
    });
  options = { headers: this.headers };
 
  // header = {
  //   headers: new HttpHeaders()
  //     .set('Authorization',  `Bearer ${ this.getToken() }`)
  // }

  

  constructor(private http: HttpClient) {}

  getToken(){
    var mytoken = localStorage.getItem('token') || undefined;
    return mytoken;
  }
  getUserByToken(token:any){
    var decodedToken:any = this.jwthelper.decodeToken(token);
    var user = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return user;
  }
  getAllUsers() {
    return this.http.get(this.baseUrl + '/api/UserManager/get-users-list', this.options);
  }
  getAllRoles() {
    return this.http.get(this.baseUrl + '/api/UserManager/get-roles-list', this.options);
  }
  addNewUser(data: IUserDetails): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type' :  'multipart/form-data',
      'Authorization':`Bearer ${this.getToken()}` 
      });
    let options = { headers: headers };
    return this.http.post(this.baseUrl + '/api/UserManager/create-user', data , options);
  }
}
