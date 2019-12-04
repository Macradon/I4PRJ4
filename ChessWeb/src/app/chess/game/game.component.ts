import { Component } from "@angular/core";
import { BoardTile } from "../models/board-tile";
import { createBoard } from "../models/utils/game-utils";
import { Pawn } from "../models/pieces/pawn";

@Component({
  selector: "app-game",
  templateUrl: "./game.component.html",
  styleUrls: ["./game.component.sass"]
})
export class GameComponent {
  public board: BoardTile[][] = [];
  public selectedTile: BoardTile = null;
  public availableMoves: BoardTile[] = null;

  constructor() {
    this.board = createBoard();
  }

  public onTileSelect(tile: BoardTile) {
    if (!this.selectedTile) {
      this.selectedTile = tile;

      this.availableMoves = tile.piece.getAvailableMoves(
        tile.position,
        this.board
      );
      console.log(this.availableMoves.length);
      console.log(this.availableMoves);
    } else {
      if (tile.id === this.selectedTile.id) {
        this.selectedTile = null;
        this.availableMoves = null;
      } else {
        const validMove = this.availableMoves.filter(
          move => move.id === tile.id
        );

        if (validMove.length > 0) {
          if (this.selectedTile.piece instanceof Pawn) {
            this.selectedTile.piece.firstMove = false;
          }

          this.board[tile.position.x][
            tile.position.y
          ].piece = this.selectedTile.piece;

          this.board[this.selectedTile.position.x][
            this.selectedTile.position.y
          ].piece = null;
          this.selectedTile = null;
          this.availableMoves = null;
        }
      }
    }
  }
}
