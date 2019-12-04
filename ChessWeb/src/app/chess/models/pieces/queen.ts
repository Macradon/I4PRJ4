import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils/piece-utils";
import { URL_QUEEN_BLACK, URL_QUEEN_WHITE } from "../utils/urls";

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
    let result: BoardTile[] = [];

    result = result.concat(
      availableMovesInDirection(position, Direction.NORTH, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.NORTHEAST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.EAST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.SOUTHEAST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.SOUTH, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.SOUTHWEST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.WEST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.NORTHWEST, boardState)
    );

    return result;
  }
}
