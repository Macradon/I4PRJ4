import { ChessPiece, PlayerColor } from '../chess-piece';
import { BoardPosition } from '../board-position';

export class Rook implements ChessPiece {
  pictureURL: string;
  position: BoardPosition;
  player: PlayerColor;

  getAvailableMoves(boardState: ChessPiece[][]): BoardPosition[] {
    throw new Error('Method not implemented.');
  }
}
