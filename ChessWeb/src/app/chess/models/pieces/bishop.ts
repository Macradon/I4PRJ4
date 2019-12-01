import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils/utils";

export class Bishop implements ChessPiece {
  playerColor: PlayerColor;
  position: BoardPosition;
  pictureURL: string;

  constructor(player: PlayerColor) {
    this.playerColor = player;
    this.pictureURL =
      player === PlayerColor.Black ? URL_BISHOP_BLACK : URL_BISHOP_WHITE;
  }

  getAvailableMoves(
    position: BoardPosition,
    boardState: BoardTile[][]
  ): BoardTile[] {
    const result: BoardTile[] = [];

    result.concat(
      availableMovesInDirection(position, Direction.NORTHEAST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.SOUTHEAST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.SOUTHWEST, boardState)
    );
    result.concat(
      availableMovesInDirection(position, Direction.NORTHWEST, boardState)
    );

    return result;
  }
}
