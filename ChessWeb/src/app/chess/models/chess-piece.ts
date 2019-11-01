import { BoardTile } from "./board-tile";
import { BoardPosition } from "./board-position";

export enum PlayerColor {
  White,
  Black
}

export interface ChessPiece {
  playerColor: PlayerColor;
  position: BoardPosition;
  pictureURL: string;

  getAvailableMoves(boardState: BoardTile[][]): BoardTile[];
}
