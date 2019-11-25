import { Injectable, Output, EventEmitter } from '@angular/core';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //wrong
  uri = 'api/auth';

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus: boolean;
  redirectUrl: string;
  user: User;

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    //wrong
    return this.http.post(`${this.uri}/login`, data)
      .pipe(
        tap(_ => {
          this.isLoggedIn.emit(true);
          this.loggedInStatus = true;
        }),
        this.handleError('login', [])
      );     
  }

  
  logout() {
    //Localstorage needs to have a token and user for it to work
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.isLoggedIn.emit(false);
    this.loggedInStatus = false;
  }
  
  register(data: any): Observable<any> {
    return this.http.post(`${this.uri}/register`, data)
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
  
      return of(result as T);
    };
  }
  
  private log(message: string) {
    console.log(message);
  }
}
