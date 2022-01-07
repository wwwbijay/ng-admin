import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, from } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();

  constructor(private http: HttpClient) {}

  getUserByUsername(username: string) {
    return this.http.get(this.baseUrl + '/api/UserManager/get-user-by-username?userName='+username);
  }
  getToken(){
    var mytoken = localStorage.getItem('token') || undefined;
    return mytoken;
  }
  getUserByToken(token:any){
    var decodedToken:any = this.jwthelper.decodeToken(token);
    var user = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return user;
  }
}
