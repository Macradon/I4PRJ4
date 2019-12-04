import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  user: User;

  constructor(private service: LoginService) { }

  ngOnInit() {  
    console.log(localStorage)
    this.service
      .getUser(localStorage.getItem('email'))     
      .subscribe((data:User) => {
        this.user = data;    
    });   
  }
}
