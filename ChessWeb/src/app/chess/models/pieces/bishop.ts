import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils";

export class Bishop implements ChessPiece {
  player: PlayerColor;
  position: BoardPosition;
  pictureURL: string;

  constructor(player: PlayerColor, position: BoardPosition) {
    this.player = player;
    this.position = position;
  }

  getAvailableMoves(boardState: BoardTile[][]): BoardTile[] {
    const result: BoardTile[] = [];

    result.concat(
      availableMovesInDirection(this.position, Direction.NORTHEAST, boardState)
    );
    result.concat(
      availableMovesInDirection(this.position, Direction.SOUTHEAST, boardState)
    );
    result.concat(
      availableMovesInDirection(this.position, Direction.SOUTHWEST, boardState)
    );
    result.concat(
      availableMovesInDirection(this.position, Direction.NORTHWEST, boardState)
    );

    return result;
  }
}
