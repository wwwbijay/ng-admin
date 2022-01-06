import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {Router} from "@angular/router"
import { AuthService } from '../auth/auth.service';
import { IUser } from '../auth/IUser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  currentUser: IUser = {
    userName: '',
    email: '',
    roles: ''
  };
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit(): void {}
  get username(){
    return this.loginForm.get('username');
  }
  get password(){
    return this.loginForm.get('password');
  }
  onSubmit(){
    var login_model = {
     userName: this.loginForm.value.username,
     password: this.loginForm.value.password
    };

    this.authservice.login(login_model).subscribe({
      next: (rawToken:any) => {
        alert('Logged in Successfully!');
        
      },
      error: (err: Error) => {
        alert('Username or password Incorrect!');
      },
      complete: () => { 
        this.router.navigate(['/']);
      },
    });
    
    // if( this._username === this.loginForm.value.email && this._password === this.loginForm.value.password ){
    //     localStorage.setItem('token','68d5aaaa3emsh19d4967d4fab744p1a4ad6jsn30b6fb59bc09');
    //     localStorage.setItem('user_type','admin');
    //     this.router.navigate(['/']);
    //     alert('Logged in Successfully!');
    // }else{
    //   alert('Username or password Incorrect');
    // }
        
   }

}
