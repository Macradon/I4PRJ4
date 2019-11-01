import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { filterPossibleMoves, BOARD_SIZE } from "../utils";

export class Knight implements ChessPiece {
  playerColor: PlayerColor;
  pictureURL: string;
  position: BoardPosition;

  constructor(player: PlayerColor, position: BoardPosition) {
    this.playerColor = player;
    this.position = position;
  }

  getAvailableMoves(boardState: BoardTile[][]): BoardTile[] {
    const possibleMoves: BoardTile[] = [];

    //North
    if (this.position.y - 2 >= 0) {
      if (this.position.x - 1 >= 0) {
        possibleMoves.push(
          boardState[this.position.x - 1][this.position.y - 2]
        );
      }
      if (this.position.x + 1 < BOARD_SIZE) {
        possibleMoves.push(
          boardState[this.position.x + 1][this.position.y - 2]
        );
      }
    }

    //South
    if (this.position.y + 2 >= 0) {
      if (this.position.x - 1 >= 0) {
        possibleMoves.push(
          boardState[this.position.x - 1][this.position.y + 2]
        );
      }
      if (this.position.x + 1 < BOARD_SIZE) {
        possibleMoves.push(
          boardState[this.position.x + 1][this.position.y + 2]
        );
      }
    }

    //East
    if (this.position.x + 2 >= 0) {
      if (this.position.y - 1 >= 0) {
        possibleMoves.push(
          boardState[this.position.x + 2][this.position.y - 1]
        );
      }
      if (this.position.x + 1 < BOARD_SIZE) {
        possibleMoves.push(
          boardState[this.position.x + 2][this.position.y + 1]
        );
      }
    }

    //West
    if (this.position.x - 2 >= 0) {
      if (this.position.y - 1 >= 0) {
        possibleMoves.push(
          boardState[this.position.x - 2][this.position.y - 1]
        );
      }
      if (this.position.x + 1 < BOARD_SIZE) {
        possibleMoves.push(
          boardState[this.position.x - 2][this.position.y + 1]
        );
      }
    }

    return filterPossibleMoves(this.playerColor, possibleMoves);
  }
}
