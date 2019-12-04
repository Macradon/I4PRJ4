import { Component } from "@angular/core";
import { BoardTile } from "../models/board-tile";
import { createBoard, BOARD_SIZE } from "../models/utils/game-utils";
import { Pawn } from "../models/pieces/pawn";
import { PlayerColor } from "../models/chess-piece";
import { King } from "../models/pieces/king";
import { ChessAI } from "../ai/chess-ai";
import { RandomAI } from "../ai/random-ai";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"]
})
export class GameComponent {
  public board: BoardTile[][] = [];
  public selectedTile: BoardTile = null;
  public availableMoves: BoardTile[] = null;
  public gameOver = false;
  public youWin = false;
  private playerTurn = true;
  private whitePieces: BoardTile[] = [];
  private blackPieces: BoardTile[] = [];
  private ai: ChessAI;

  constructor() {
    this.board = createBoard();
    this.ai = new RandomAI();

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
        if (tile.piece) {
          this.selectedTile = tile;

          this.availableMoves = tile.piece.getAvailableMoves(
            tile.position,
            this.board
          );
        }
      } else {
        if (tile.id === this.selectedTile.id) {
          this.selectedTile = null;
          this.availableMoves = null;
        } else {
          const validMove = this.availableMoves.filter(
            move => move.id === tile.id
          );

          if (validMove.length > 0) {
            this.movePiece(this.selectedTile, tile);

            this.takeAITurn();
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
}
