import { BoardTile } from "./board-tile";
import { BoardPosition } from "./board-position";

export enum PlayerColor {
  White,
  Black
}

export interface ChessPiece {
  playerColor: PlayerColor;
  pictureURL: string;

  getAvailableMoves(
    position: BoardPosition,
    boardState: BoardTile[][]
  ): BoardTile[];
}
