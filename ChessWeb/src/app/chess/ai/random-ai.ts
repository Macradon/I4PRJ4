import { ChessAI } from "./chess-ai";
import { BoardTile } from "../models/board-tile";
import { AIMove } from "../models/ai-move";

export class RandomAI implements ChessAI {
  getMove(pieces: BoardTile[], board: BoardTile[][]): AIMove {
    let move: AIMove = null;
    let work = pieces;
    let moveFound = false;

    while (!moveFound) {
      const randomTile = work[Math.floor(Math.random() * 10000) % work.length];
      const moves = randomTile.piece.getAvailableMoves(
        randomTile.position,
        board
      );

      if (moves.length > 0) {
        const randomMove =
          moves[Math.floor(Math.random() * 10000) % moves.length];

        move = { from: randomTile, to: randomMove };
        moveFound = true;
      } else {
        work = work.filter(tile => tile.id !== randomTile.id);
      }
    }
    console.log(move);
    return move;
  }
}
