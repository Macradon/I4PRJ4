import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { filterPossibleMoves } from "../utils/piece-utils";
import { BOARD_SIZE } from "../utils/game-utils";
import { URL_KNIGHT_BLACK, URL_KNIGHT_WHITE } from "../utils/urls";

export class Knight implements ChessPiece {
  playerColor: PlayerColor;
  pictureURL: string;
  position: BoardPosition;

  constructor(player: PlayerColor) {
    this.playerColor = player;
    this.pictureURL =
      player === PlayerColor.Black ? URL_KNIGHT_BLACK : URL_KNIGHT_WHITE;
  }

  getAvailableMoves(
    position: BoardPosition,
    boardState: BoardTile[][]
  ): BoardTile[] {
    const possibleMoves: BoardTile[] = [];

    //North
    if (position.y - 2 >= 0) {
      if (position.x - 1 >= 0) {
        possibleMoves.push(boardState[position.x - 1][position.y - 2]);
      }
      if (position.x + 1 < BOARD_SIZE) {
        possibleMoves.push(boardState[position.x + 1][position.y - 2]);
      }
    }

    //South
    if (position.y + 2 < BOARD_SIZE) {
      if (position.x - 1 >= 0) {
        possibleMoves.push(boardState[position.x - 1][position.y + 2]);
      }
      if (position.x + 1 < BOARD_SIZE) {
        possibleMoves.push(boardState[position.x + 1][position.y + 2]);
      }
    }

    //East
    if (position.x + 2 < BOARD_SIZE) {
      if (position.y - 1 >= 0) {
        possibleMoves.push(boardState[position.x + 2][position.y - 1]);
      }
      if (position.x + 1 < BOARD_SIZE) {
        possibleMoves.push(boardState[position.x + 2][position.y + 1]);
      }
    }

    //West
    if (position.x - 2 >= 0) {
      if (position.y - 1 >= 0) {
        possibleMoves.push(boardState[position.x - 2][position.y - 1]);
      }
      if (position.y + 1 < BOARD_SIZE) {
        possibleMoves.push(boardState[position.x - 2][position.y + 1]);
      }
    }

    return filterPossibleMoves(this.playerColor, possibleMoves);
  }
}
