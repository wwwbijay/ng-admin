import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class userManageServices {

  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();

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
    return this.http.get(this.baseUrl + '/api/UserManager/get-users-list');
  }
  getAllRoles() {
    return this.http.get(this.baseUrl + '/api/UserManager/get-roles-list');
  }
}
