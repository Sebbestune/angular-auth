import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoginDetails } from './interfaces/login-details';
import { User } from './interfaces/user';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authapp';

  loginDetails: LoginDetails;

  user: User;

  loggedIn$: Observable<boolean>;

  constructor(private auth: AuthService){
    this.loginDetails = {
      email:"seb@seb.seb",
      password:"sebsebseb"
    }

    this.user = {
      id:-1,
      name:"",
      email:""
    }

    this.loggedIn$ = this.auth.loggedIn$;
  }

  login(){
    this.auth.loginUser(this.loginDetails);
  }
  logout(){
    this.auth.logOut();
  }

  getUser(){
    this.auth.getUser2().subscribe(res => {
      console.log(res[0]);
      this.user = res[0];
    })
  }
}
