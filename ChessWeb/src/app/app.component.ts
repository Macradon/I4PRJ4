import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'ChessWeb';
  loginStatus = false;
  username: string;

  constructor( private router: Router, 
    private service: LoginService) {}

    ngOnInit() {
      this.username = localStorage.getItem('user')
      if(localStorage.length > 0 || this.service.loggedInStatus == true) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }  
  
    this.service.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        //doesn't get username, until you reload :(
        this.username = localStorage.getItem('user')
        this.loginStatus = true;      
      } else {
        this.loginStatus = false;
      }
    });
  }

  logout() {
    this.service.logout();    
    this.router.navigate(['login']);      
  }
}
