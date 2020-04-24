import { Component, OnInit, ViewChild } from '@angular/core';
import { HighScoresService } from './high-scores.service';
import { Highscore } from './highscore';
import {MatPaginator} from '@angular/material/paginator';
@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.sass']
})
export class HighScoresComponent implements OnInit {
  highscores: Highscore[];
  p: any;

  constructor(private service: HighScoresService) { }

  ngOnInit() {
    this.service
      .getHighscores()     
      .subscribe((data:Highscore[]) => {
        this.highscores = data;    
    }); 
  }

  sortPlayers() {
    this.highscores.sort(function (x, y) {
      let a = x.firstName.toUpperCase(),
          b = y.firstName.toUpperCase();
      return a == b ? 0 : a > b ? 1 : -1;
    });
  }

  sortTime() {    
    this.highscores.sort(function(x,y) {
      let a: number = x.time.valueOf(),
          b: number = y.time.valueOf();
      return a - b;
    });
  }

  sortMoves() {    
    this.highscores.sort(function(x,y) {
      let a: number = x.numberOfMoves.valueOf(),
          b: number = y.numberOfMoves.valueOf();
      return a -b;
    });
  }

}
