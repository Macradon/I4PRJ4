import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils/piece-utils";

export class Rook implements ChessPiece {
  pictureURL: string;
  position: BoardPosition;
  playerColor: PlayerColor;

  constructor(player: PlayerColor) {
    this.playerColor = player;
    this.pictureURL =
      player === PlayerColor.Black ? URL_ROOK_BLACK : URL_ROOK_WHITE;
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
      availableMovesInDirection(position, Direction.EAST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.SOUTH, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.WEST, boardState)
    );

    return result;
  }
}
