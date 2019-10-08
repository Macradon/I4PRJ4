import { BoardPosition } from './board-position';

export enum PlayerColor {
  White,
  Black
}

export interface ChessPiece {
  player: PlayerColor;
  position: BoardPosition;
  pictureURL: string;

  getAvailableMoves(boardState: ChessPiece[][]): BoardPosition[];
}
