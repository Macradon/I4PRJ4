import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';

@Injectable({
  providedIn: 'root'
})
export class HighScoresService {
  
  uri = 'https://localhost:44355/api/highscores';

  constructor(private http: HttpClient, private service: LoginService) { }

  createHighScore(turnsTaken: Number, youWin: Boolean, time: Number) {
    var currentUser = this.service.userList.find(x => x.Id == localStorage.getItem('userId'));
    return this.http.post(`${this.uri}/create`,{
      username: currentUser.Username,       
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      time: time,
      won: youWin,
      numberOfMoves: turnsTaken
    })
  }

  getHighscores() {
    return this
      .http
      .get(`${this.uri}`);
  }
}
