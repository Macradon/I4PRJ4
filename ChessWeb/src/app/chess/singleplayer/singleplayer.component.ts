import { Component, OnInit, OnDestroy } from "@angular/core";
import { BoardTile } from "../models/board-tile";
import { PlayerColor } from "../models/chess-piece";
import { HighScoresService } from "src/app/high-scores/high-scores.service";
import { Router } from "@angular/router";
import { LoginService } from "src/app/login/login.service";
import { User } from "src/app/login/user";
import { ToastService } from "../../toast/toast.service";
import { ChessGame } from "../chess-game";
import { Subscription } from "rxjs";

@Component({
  selector: "app-singleplayer",
  templateUrl: "./singleplayer.component.html",
  styleUrls: ["./singleplayer.component.sass"],
})
export class SingleplayerComponent implements OnInit, OnDestroy {
  public game: ChessGame = new ChessGame(false);
  public selectedTile: BoardTile = null;
  public availableMoves: BoardTile[] = [];
  public currentUser: User;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: HighScoresService,
    private loginService: LoginService
  ) {
    this.loginService
      .getUser(localStorage.getItem("email"))
      .subscribe((data: User) => {
        this.currentUser = data;
      });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit(): void {
    this.subscription = this.game.gameOver.subscribe(() => this.endOfGame());
  }

  public onTileSelect(tile: BoardTile) {
    if (this.game.playerTurn === PlayerColor.White) {
      if (!this.selectedTile) {
        if (tile.piece.playerColor === PlayerColor.White) {
          this.selectTile(tile);
        }
      } else {
        if (tile.id === this.selectedTile.id) {
          this.unselectTile();
        } else {
          const validMove = this.availableMoves.filter(
            (move) => move.id === tile.id
          );

          if (validMove.length > 0) {
            this.game.movePiece(this.selectedTile, tile);
            this.unselectTile();

            if (!this.game.winner) {
              this.game.takeAITurn();
            }
          }
        }
      }
    }
  }

  private selectTile(tile: BoardTile) {
    this.selectedTile = tile;
    this.selectedTile.isSelected = true;

    this.availableMoves = tile.piece.getAvailableMoves(
      tile.position,
      this.game.board
    );
    this.availableMoves.forEach((tile) => (tile.isAvailableMove = true));
  }

  private unselectTile() {
    this.selectedTile.isSelected = false;
    this.selectedTile = null;

    this.availableMoves.forEach((tile) => (tile.isAvailableMove = false));
    this.availableMoves = [];
  }

  private endOfGame(): void {
    if (this.game.winner === PlayerColor.White) {
      this.toast.success({ message: "Congratulations, you win!" }, true, 10000);
    } else {
      this.toast.error({ message: "Better luck next time :(" }, true, 10000);
    }
    this.service.createHighScore(
      this.game.turnsTaken,
      this.game.winner === PlayerColor.White ? true : false,
      this.game.time,
      this.currentUser
    );
    this.router.navigate(["/highscores"]);
  }
}
