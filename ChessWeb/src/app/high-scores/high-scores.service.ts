import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HighScoresService {
  
  uri = '/api/highscores';

  constructor(private http: HttpClient) { }

  createHighScore(data) {
  this.http.post(`${this.uri}`, data)
    .subscribe(res => console.log('Done'));
  }

  getHighscores() {
    return this
      .http
      .get(`${this.uri}`);
  }
}
