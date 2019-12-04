import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { availableMovesInDirection, Direction } from "../utils/piece-utils";
import { URL_ROOK_BLACK, URL_ROOK_WHITE } from "../utils/urls";

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
    let result: BoardTile[] = [];

    result = result.concat(
      availableMovesInDirection(position, Direction.NORTH, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.EAST, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.SOUTH, boardState)
    );
    result = result.concat(
      availableMovesInDirection(position, Direction.WEST, boardState)
    );

    return result;
  }
}
