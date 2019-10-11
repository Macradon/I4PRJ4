import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";

export class Rook implements ChessPiece {
  pictureURL: string;
  position: BoardPosition;
  player: PlayerColor;

  constructor(player: PlayerColor) {
    this.player = player;
  }

  getAvailableMoves(boardState: BoardTile[][]): BoardPosition[] {
    throw new Error("Method not implemented.");
  }
}
