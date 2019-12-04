import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { filterPossibleMoves } from "../utils/piece-utils";
import { BOARD_SIZE } from "../utils/game-utils";
import { URL_KING_BLACK, URL_KING_WHITE } from "../utils/urls";

export class King implements ChessPiece {
  playerColor: PlayerColor;
  position: BoardPosition;
  pictureURL: string;

  constructor(player: PlayerColor) {
    this.playerColor = player;
    this.pictureURL =
      player === PlayerColor.Black ? URL_KING_BLACK : URL_KING_WHITE;
  }

  getAvailableMoves(
    position: BoardPosition,
    boardState: BoardTile[][]
  ): BoardTile[] {
    const possibleMoves: BoardTile[] = [];

    for (let x = position.x - 1; x <= position.x + 1; x++) {
      for (let y = position.y - 1; y <= position.y + 1; y++) {
        if (x >= 0 && x < BOARD_SIZE && y >= 0 && y < BOARD_SIZE) {
          possibleMoves.push(boardState[x][y]);
        }
      }
    }

    return filterPossibleMoves(this.playerColor, possibleMoves);
  }
}
