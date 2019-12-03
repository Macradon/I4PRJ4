import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { User } from './login/user';

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
  users: User[];
  currentUser: User;

  constructor( private router: Router, 
    private service: LoginService) {}

    ngOnInit() {
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
      this.service
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;        
        console.log(data.find(x => x.token.refreshToken.refreshToken == this.token));
        //console.log("current user", this.currentUser);
    });  

    //this.currentUser = this.users.find(x => x.token.refreshToken.refreshToken == this.token)
      //hvis den token, som er gemt i localstorage passer med den user, som er logget ind
      if(this.token) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }  
  
    this.service.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        //doesn't get username, until you reload :(
        //this.user = localStorage.getItem('user');
        this.loginStatus = true;      
      } else {
        this.loginStatus = false;
      }
    });
  }

  logout() {
    this.currentUser = this.users.find(x => x.token.refreshToken.refreshToken == this.token);
        console.log("current user", this.currentUser);
    console.log("current user", this.service.user)
    this.service.logout(this.service.user)
      .subscribe(res => {
        this.loginStatus = false;
        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
    });       
  }
}
