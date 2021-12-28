import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import {Router} from "@angular/router"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _email: String = 'bijay@mypay.com.np';
  _password: String = '12345678';

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  get email(){
    return this.loginForm.get('email');
  }
  get password(){
    return this.loginForm.get('password');
  }
  onSubmit(){
    if( this._email === this.loginForm.value.email && this._password === this.loginForm.value.password ){
        localStorage.setItem('token','68d5aaaa3emsh19d4967d4fab744p1a4ad6jsn30b6fb59bc09');
        localStorage.setItem('user_type','admin');
        this.router.navigate(['/']);
        alert('Logged in Successfully!');
    }else{
      alert('Username or password Incorrect');
    }
        
   }

}
