import { BoardPosition } from "./board-position";
import { ChessPiece } from "./chess-piece";

export interface BoardTile {
  id: number;
  position: BoardPosition;
  piece: ChessPiece | null;
  isBlack: boolean;
}
