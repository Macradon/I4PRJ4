import { Component, OnInit } from '@angular/core';
import { HighScoresService } from './high-scores.service';
import { Highscore } from './highscore';

@Component({
  selector: 'app-high-scores',
  templateUrl: './high-scores.component.html',
  styleUrls: ['./high-scores.component.sass']
})
export class HighScoresComponent implements OnInit {
  highscores: Highscore[];

  constructor(private service: HighScoresService) { }

  ngOnInit() {
    this.service
      .getHighscores()     
      .subscribe((data:Highscore[]) => {
        this.highscores = data;
        console.log(this.highscores)        
    }); 
  }

}
