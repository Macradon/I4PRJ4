import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { User } from './login/user';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ChessWeb';
  loginStatus = false;
  username: string;
  token: string;
  currentUser: User;
  user: string;
  email: string;

  constructor( private router: Router, 
    private service: LoginService) {}

    ngOnInit() {
    console.log(localStorage)
    if (localStorage !== null) {
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
        this.service
        .getUser(localStorage.getItem('email'))     
        .subscribe((data:User) => {
          this.currentUser = data;    
      }); 
    };    
    
    if(this.token) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }  
  
    this.service.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        this.username = localStorage.getItem('username');
        this.loginStatus = true;      
      } else {
        this.loginStatus = false;
      }
    });
  }

  logout() {   
   this.service
      .getUser(localStorage.getItem('email'))     
      .subscribe((data: User) => {
        this.currentUser = data;    
    }); 
    console.log("this user", this.currentUser)
    localStorage.clear();
    this.router.navigate(['login']);
    this.loginStatus = false;
    this.service.logout(this.currentUser)
      .subscribe(res => {
        console.log(res)        
      });      
  }
}
