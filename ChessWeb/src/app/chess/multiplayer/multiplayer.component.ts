import { Component, OnInit, OnDestroy } from "@angular/core";
import { BoardTile } from "../models/board-tile";
import { PlayerColor } from "../models/chess-piece";
import { HighScoresService } from "src/app/high-scores/high-scores.service";
import { Router } from "@angular/router";
import { LoginService } from "src/app/login/login.service";
import { User } from "src/app/login/user";
import { ToastService } from "../../toast/toast.service";
import { ChessGame } from "../chess-game";
import { GameSignalRService } from "src/app/signalR/game-signal-r.service";
import { ColorDTO } from "../models/colorDTO";
import { Move } from "../models/move";
import { Subscription } from "rxjs";

@Component({
  selector: "app-multiplayer",
  templateUrl: "./multiplayer.component.html",
  styleUrls: ["./multiplayer.component.sass"],
})
export class MultiplayerComponent implements OnInit, OnDestroy {
  public game: ChessGame = new ChessGame(false);
  public selectedTile: BoardTile = null;
  public availableMoves: BoardTile[] = [];
  public currentUser: User;
  public playerColor: PlayerColor = null;
  public pcWhite = PlayerColor.White;
  public gameStarted = false;
  private gameRoom: string;
  private subscriptions: Subscription[] = [];

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: HighScoresService,
    private loginService: LoginService,
    private signalRService: GameSignalRService
  ) {
    this.loginService
      .getUser(localStorage.getItem("email"))
      .subscribe((data: User) => {
        this.currentUser = data;
      });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.game.gameOver.subscribe((winner) => {
        this.endOfGame();
        console.log("GAME OVER");
      })
    );

    this.subscriptions.push(
      this.signalRService.connection.subscribe((connectionId) => {
        this.signalRService.findOpenGameRoom(connectionId);
        console.log(`ConnectionId received ${connectionId}`);
      })
    );
    this.subscriptions.push(
      this.signalRService.gameBegin.subscribe((gameRoom) => {
        this.gameRoom = gameRoom;
        this.gameStarted = true;
        console.log(`Game start room received ${gameRoom}`);
      })
    );
    this.subscriptions.push(
      this.signalRService.queued.subscribe((dto: ColorDTO) => {
        this.playerColor = dto.color;
        console.log(`Color received ${dto}`);
      })
    );
    this.subscriptions.push(
      this.signalRService.moveReceived.subscribe((move: Move) => {
        console.log(`Move received`);
        console.log(move);
        this.game.movePiece(move.from, move.to);
      })
    );

    this.signalRService.startConnection();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  public onTileSelect(tile: BoardTile) {
    if (this.game.playerTurn === this.playerColor) {
      if (!this.selectedTile) {
        if (tile.piece.playerColor === this.playerColor) {
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
            this.signalRService.sendMove(this.gameRoom, {
              from: this.selectedTile,
              to: tile,
            });
            this.unselectTile();
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
    this.availableMoves.forEach((t) => (t.isAvailableMove = true));
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
