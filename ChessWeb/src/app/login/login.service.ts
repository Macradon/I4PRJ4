import { Injectable, Output, EventEmitter } from '@angular/core';
import { User, RefreshToken } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  
  uri = 'https://localhost:44355/api/auth';

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus: boolean;
  redirectUrl: string;
  user: User;
  refreshtoken: RefreshToken;
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    console.log(data)
    return this.http.post(`${this.uri}/login`, data)
      .pipe(
        tap(_ => {
          this.isLoggedIn.emit(true);
          this.loggedInStatus = true;
        })
      );     
  }

  
  logout(data: any): Observable<any> {
    localStorage.removeItem('user');        
    console.log("token", data.token)
    return this.http.post(`${this.uri}/logout`, data)
    .pipe(
      tap(_ => {
        this.isLoggedIn.emit(false);
        this.loggedInStatus = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');        
      })
    )    
  }
  
  register(data: any): Observable<any> {
    return this.http.post(`${this.uri}/register`, 
    {
      Username: data.Username, 
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName
    })
  }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }
}
