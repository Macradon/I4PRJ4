import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils/piece-utils";
import { URL_BISHOP_BLACK, URL_BISHOP_WHITE } from "../utils/urls";

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
    let result: BoardTile[] = [];

    result = result.concat(
      availableMovesInDirection(position, Direction.NORTHEAST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.SOUTHEAST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.SOUTHWEST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.NORTHWEST, boardState)
    );

    return result;
  }
}
