import { BoardTile } from "../models/board-tile";
import { AIMove } from "../models/ai-move";

export interface ChessAI {
  getMove(pieces: BoardTile[], board: BoardTile[][]): AIMove;
}
