import { Injectable, Output, EventEmitter } from "@angular/core";
import { User, RefreshToken } from "./user";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  uri = "https://chessdatabasebackendapi.azurewebsites.net/api/auth";

  @Output() isLoggedIn: EventEmitter<any> = new EventEmitter();
  loggedInStatus: boolean;
  redirectUrl: string;
  user: User;
  userList: User[];
  refreshtoken: RefreshToken;
  constructor(private http: HttpClient) {}

  login(data: any): Observable<any> {
    console.log(data);
    return this.http.post(`${this.uri}/login`, data).pipe(
      tap((_) => {
        this.isLoggedIn.emit(true);
        this.loggedInStatus = true;
      })
    );
  }

  logout(Username: String, token: any): Observable<any> {
    console.log("mail", Username, "token", token);
    return (
      this.http
        .post(
          `${this.uri}/logout?Username=${Username}&token=${token}`,
          Username,
          token
        )
        // Username: data.Username,
        // firstName: data.firstName,
        // lastName: data.lastName,
        // password: data.password,
        // gamesPlayed: data.gamesPlayed,
        // gamesWon: data.gamesWon,
        // bestTime: data.bestTime,
        // avgMovesNumber: data.avgMovesNumber,
        // token: data.token,
        // Id: data.Id
        // )
        .pipe(
          tap((_) => {
            this.isLoggedIn.emit(false);
            this.loggedInStatus = false;
          })
        )
    );
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.uri}/register`, {
      Username: data.Username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }

  getUsers() {
    return this.http.get(`${this.uri}/users`);
  }

  getUser(data: string) {
    return this.http.get(`${this.uri}/user?email=${data}`);
  }
}
