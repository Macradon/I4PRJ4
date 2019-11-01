import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { filterPossibleMoves, BOARD_SIZE } from "../utils";

export class King implements ChessPiece {
  playerColor: PlayerColor;
  position: BoardPosition;
  pictureURL: string;
  getAvailableMoves(boardState: BoardTile[][]): BoardTile[] {
    const possibleMoves: BoardTile[] = [];

    for (let x = this.position.x - 1; x <= this.position.x + 1; x++) {
      for (let y = this.position.y - 1; y <= this.position.y + 1; y++) {
        if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
          possibleMoves.push(boardState[x][y]);
        }
      }
    }

    return filterPossibleMoves(this.playerColor, possibleMoves);
  }
}
