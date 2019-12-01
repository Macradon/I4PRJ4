import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils/utils";

export class Queen implements ChessPiece {
  playerColor: PlayerColor;
  position: BoardPosition;
  pictureURL: string;

  constructor(player: PlayerColor) {
    this.playerColor = player;
    this.pictureURL =
      player === PlayerColor.Black ? URL_QUEEN_BLACK : URL_QUEEN_WHITE;
  }

  getAvailableMoves(
    position: BoardPosition,
    boardState: BoardTile[][]
  ): BoardTile[] {
    const result: BoardTile[] = [];

    result.concat(
      availableMovesInDirection(position, Direction.NORTH, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.NORTHEAST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.EAST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.SOUTHEAST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.SOUTH, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.SOUTHWEST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.WEST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.NORTHWEST, boardState)
    );

    return result;
  }
}
