import { BoardPosition } from "./board-position";
import { BoardTile } from "./board-tile";

export enum PlayerColor {
  White,
  Black
}

export interface ChessPiece {
  player: PlayerColor;
  pictureURL: string;

  getAvailableMoves(boardState: BoardTile[][]): BoardPosition[];
}
