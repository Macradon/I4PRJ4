import { BoardTile } from "../models/board-tile";
import { Move } from "../models/move";

export interface ChessAI {
  getMove(pieces: BoardTile[], board: BoardTile[][]): Move;
}
