import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils";

export class Rook implements ChessPiece {
  pictureURL: string;
  position: BoardPosition;
  player: PlayerColor;

  constructor(player: PlayerColor) {
    this.player = player;
  }

  getAvailableMoves(boardState: BoardTile[][]): BoardTile[] {
    const result: BoardTile[] = [];

    result.concat(
      availableMovesInDirection(this.position, Direction.NORTH, boardState)
    );
    result.concat(
      availableMovesInDirection(this.position, Direction.EAST, boardState)
    );
    result.concat(
      availableMovesInDirection(this.position, Direction.SOUTH, boardState)
    );
    result.concat(
      availableMovesInDirection(this.position, Direction.WEST, boardState)
    );

    return result;
  }
}
