import { createBoard, BOARD_SIZE } from "./models/utils/game-utils";
import { BoardTile } from "./models/board-tile";
import { ChessAI } from "./ai/chess-ai";
import { PlayerColor } from "./models/chess-piece";
import { RandomAI } from "./ai/random-ai";
import { Pawn } from "./models/pieces/pawn";
import { King } from "./models/pieces/king";
import { EventEmitter } from "@angular/core";

export class ChessGame {
  public board: BoardTile[][] = [];
  public gameOver = new EventEmitter<void>();
  public winner: PlayerColor = null;
  public playerTurn: PlayerColor = PlayerColor.White;
  public whitePieces: BoardTile[] = [];
  public blackPieces: BoardTile[] = [];
  private ai: ChessAI = null;
  public turnsTaken = 0;
  time = 0;
  private interval;

  constructor(multiplayer: boolean) {
    this.board = createBoard();

    for (let i = 0; i < BOARD_SIZE; i++) {
      this.whitePieces.push(this.board[i][6]);
      this.whitePieces.push(this.board[i][7]);

      this.blackPieces.push(this.board[i][0]);
      this.blackPieces.push(this.board[i][1]);
    }

    if (!multiplayer) {
      this.ai = new RandomAI();
    }

    this.startTimer();
  }

  public movePiece(from: BoardTile, to: BoardTile): void {
    const fromPiece = this.board[from.position.x][from.position.y].piece;
    const toPiece = this.board[to.position.x][to.position.y].piece;

    if (fromPiece.playerColor === this.playerTurn) {
      if (fromPiece instanceof Pawn) {
        fromPiece.firstMove = false;
      }

      if (toPiece) {
        if (toPiece instanceof King) {
          this.winner =
            this.playerTurn === PlayerColor.White
              ? PlayerColor.White
              : PlayerColor.Black;
          this.gameOver.emit();
        } else {
          if (toPiece.playerColor === PlayerColor.White) {
            this.whitePieces = this.removePiece(to, this.whitePieces);
          } else {
            this.blackPieces = this.removePiece(to, this.blackPieces);
          }
        }
      }

      this.board[to.position.x][to.position.y].piece = fromPiece;
      this.board[from.position.x][from.position.y].piece = null;

      if (this.playerTurn === PlayerColor.White) {
        this.whitePieces = this.removePiece(from, this.whitePieces);
        this.whitePieces.push(to);
        this.turnsTaken++;
      } else {
        this.blackPieces = this.removePiece(from, this.blackPieces);
        this.blackPieces.push(to);
      }

      this.playerTurn =
        this.playerTurn === PlayerColor.White
          ? PlayerColor.Black
          : PlayerColor.White;
    }
  }

  private removePiece(tile: BoardTile, pieces: BoardTile[]): BoardTile[] {
    return pieces.filter((t) => t.id !== tile.id);
  }

  public takeAITurn(): void {
    const aiMove = this.ai.getMove(this.blackPieces, this.board);
    this.movePiece(aiMove.from, aiMove.to);
  }

  private startTimer() {
    this.interval = setInterval(() => {
      if (!this.gameOver) {
        this.time++;
      }
    }, 1000);
  }
}
