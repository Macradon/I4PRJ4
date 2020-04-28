import { Component } from "@angular/core";
import { BoardTile } from "../models/board-tile";
import { createBoard, BOARD_SIZE } from "../models/utils/game-utils";
import { Pawn } from "../models/pieces/pawn";
import { PlayerColor } from "../models/chess-piece";
import { King } from "../models/pieces/king";
import { ChessAI } from "../ai/chess-ai";
import { RandomAI } from "../ai/random-ai";
import { HighScoresService } from "src/app/high-scores/high-scores.service";
import { Router } from "@angular/router";
import { LoginService } from "src/app/login/login.service";
import { User } from "src/app/login/user";
import { ToastService } from "../../toast/toast.service";

@Component({
  selector: "app-single-player",
  templateUrl: "./single-player.component.html",
  styleUrls: ["./single-player.component.sass"]
})
export class GameComponent {
  public board: BoardTile[][] = [];
  public selectedTile: BoardTile = null;
  public availableMoves: BoardTile[] = [];
  public gameOver = false;
  public youWin = false;
  private playerTurn = true;
  private whitePieces: BoardTile[] = [];
  private blackPieces: BoardTile[] = [];
  private ai: ChessAI;
  public turnsTaken = 0;
  time = 0;
  interval;
  currentUser: User;

  constructor(
    private router: Router,
    private toast: ToastService,
    private service: HighScoresService,
    private loginService: LoginService
  ) {
    this.board = createBoard();
    this.ai = new RandomAI();
    this.startTimer();
    this.loginService
      .getUser(localStorage.getItem("email"))
      .subscribe((data: User) => {
        this.currentUser = data;
        console.log(this.currentUser);
      });

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.whitePieces.push(this.board[i][6]);
      this.whitePieces.push(this.board[i][7]);

      this.blackPieces.push(this.board[i][0]);
      this.blackPieces.push(this.board[i][1]);
    }
  }

  public onTileSelect(tile: BoardTile) {
    if (this.playerTurn && !this.gameOver) {
      if (!this.selectedTile) {
        if (tile.piece.playerColor === PlayerColor.White) {
          this.selectedTile = tile;

          this.availableMoves = tile.piece.getAvailableMoves(
            tile.position,
            this.board
          );
        }
      } else {
        if (tile.id === this.selectedTile.id) {
          this.selectedTile = null;
          this.availableMoves = [];
        } else {
          const validMove = this.availableMoves.filter(
            move => move.id === tile.id
          );

          if (validMove.length > 0) {
            this.movePiece(this.selectedTile, tile);
            this.turnsTaken++;

            if (!this.gameOver) {
              this.takeAITurn();
            }
          }
        }
      }
    }
  }

  private movePiece(from: BoardTile, to: BoardTile): void {
    if (this.selectedTile.piece instanceof Pawn) {
      this.selectedTile.piece.firstMove = false;
    }

    if (to.piece) {
      if (to.piece instanceof King) {
        this.gameOver = true;
        this.youWin = this.playerTurn ? true : false;
        if (this.youWin === true) {
          this.toast.success(
            { message: "Congratulations, you win!" },
            true,
            10000
          );
        } else {
          this.toast.error(
            { message: "Better luck next time :(" },
            true,
            10000
          );
        }
        this.service.createHighScore(
          this.turnsTaken,
          this.youWin,
          this.time,
          this.currentUser
        );
        this.router.navigate(["/highscores"]);
      } else {
        if (to.piece.playerColor === PlayerColor.White) {
          this.whitePieces = this.removePiece(to, this.whitePieces);
        } else {
          this.blackPieces = this.removePiece(to, this.blackPieces);
        }
      }
    }

    this.board[to.position.x][to.position.y].piece = from.piece;

    this.board[from.position.x][from.position.y].piece = null;

    if (this.playerTurn) {
      this.whitePieces = this.removePiece(from, this.whitePieces);
      this.whitePieces.push(to);
    } else {
      this.blackPieces = this.removePiece(from, this.blackPieces);
      this.blackPieces.push(to);
    }

    this.selectedTile = null;
    this.availableMoves = null;
    this.playerTurn = !this.playerTurn;
  }

  private removePiece(tile: BoardTile, pieces: BoardTile[]): BoardTile[] {
    return pieces.filter(t => t.id !== tile.id);
  }

  private takeAITurn(): void {
    const aiMove = this.ai.getMove(this.blackPieces, this.board);

    this.selectedTile = aiMove.from;

    this.movePiece(aiMove.from, aiMove.to);
  }
  startTimer() {
    this.interval = setInterval(() => {
      this.time++;
    }, 1000);
    console.log("time", this.time);
  }
}
