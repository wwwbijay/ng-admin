import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUser } from './IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = environment.baseUrl;
  jwthelper = new JwtHelperService();

  currentUser: IUser = {
    userName: '',
    email: '',
    roles: ''
  };
  
  constructor(private http: HttpClient) {}

  register(model: any) {
    return this.http.post(this.baseUrl + '/api/UserManager/register', model);
  }
  isLoggedIn():boolean {
    const token = localStorage.getItem('token') || undefined;
    return !this.jwthelper.isTokenExpired(token);
  }
  
  login(model: any): Observable<IUser | undefined> {
    
    return this.http.post(this.baseUrl + '/api/Authenticate/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user.token) {
          const decodedToken = this.jwthelper.decodeToken(user.token);
         this.currentUser.roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
          localStorage.setItem('token', user.token);
          localStorage.setItem('role', this.currentUser.roles);
          return user.token;
        }
        else{
          return 0;
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.currentUser = {
      userName: '',
      email: '',
      roles: ''
    };
  }
}
