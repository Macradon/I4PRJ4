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
  users: User[];
  currentUser: User;

  constructor( private router: Router, 
    private service: LoginService) {}

    ngOnInit() {
      this.token = localStorage.getItem('token');
      this.username = localStorage.getItem('username');
      this.service
      .getUsers()      
      .subscribe((data:User[]) => {
        this.users = data;        
    }); 
     
    if(this.token) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }  
  
    this.service.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        this.username = localStorage.getItem('user');
        this.loginStatus = true;      
      } else {
        this.loginStatus = false;
      }
    });
  }

  logout() {
   this.currentUser = this.users.find(x => x.Id == localStorage.getItem('userId'));
    this.service.logout(this.currentUser)
      .subscribe(res => {
        this.loginStatus = false;
        this.router.navigate(['login']);
      }, (err) => {
        console.log(err);
        alert(err.error);
    });       
  }
}
