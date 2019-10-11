import { BoardPosition } from "./board-position";
import { ChessPiece } from "./chess-piece";

export interface BoardTile {
  position: BoardPosition;
  piece: ChessPiece | null;
}
