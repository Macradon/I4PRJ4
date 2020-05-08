import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { User } from './login/user';
import { map } from 'rxjs/operators';
import { SignalRService } from './signalR/signalR.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'ChessWeb';
  loginStatus = false;
  username: string;
  token: string;
  currentUser: User;
  user: string;
  email: string;
  
  constructor( private router: Router, 
    private service: LoginService, 
    public signalRService: SignalRService, 
    private http: HttpClient) {}

    ngOnInit() {  
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();

    if (localStorage !== null) {
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
        this.service
        .getUser(localStorage.getItem('email'))     
        .subscribe((data:User) => {
          this.currentUser = data;    
      }); 
    }   
    else this.username = this.service.user.Username.toString();
    
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
    this.loginStatus = false;
    localStorage.clear();
    this.router.navigate(['login']); 
    if(this.currentUser != null) {          
      this.service.logout(this.currentUser.Username, this.currentUser.token.refreshToken.refreshToken)
      .subscribe(res => {
        res        
      });      
    }
    else {          
      this.service.logout(this.service.user.Username, this.service.user.token.refreshToken.refreshToken)
      .subscribe(res => {
        res       
      });      
    }
    
  }

}
