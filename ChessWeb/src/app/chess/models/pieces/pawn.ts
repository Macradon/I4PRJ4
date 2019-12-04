import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { filterPossibleMoves } from "../utils/piece-utils";
import { BOARD_SIZE } from "../utils/game-utils";
import { URL_PAWN_BLACK, URL_PAWN_WHITE } from "../utils/urls";

export class Pawn implements ChessPiece {
  playerColor: PlayerColor;
  pictureURL: string;
  firstMove = true;

  constructor(player: PlayerColor) {
    this.playerColor = player;
    this.pictureURL =
      player === PlayerColor.Black ? URL_PAWN_BLACK : URL_PAWN_WHITE;
  }

  getAvailableMoves(
    position: BoardPosition,
    boardState: BoardTile[][]
  ): BoardTile[] {
    const possibleMoves: BoardTile[] = [];

    const movement = this.playerColor === PlayerColor.Black ? 1 : -1;

    const forwardTile =
      position.y + movement < BOARD_SIZE
        ? boardState[position.x][position.y + movement]
        : null;
    if (forwardTile) {
      if (this.firstMove && !forwardTile.piece) {
        const move = boardState[position.x][position.y + movement * 2];
        if (!move.piece) {
          possibleMoves.push(move);
        }
      }
      if (!forwardTile.piece) {
        possibleMoves.push(forwardTile);
      }

      if (position.x - 1 >= 0) {
        const attackPos1 = boardState[position.x - 1][position.y + movement];
        if (attackPos1.piece) {
          possibleMoves.push(attackPos1);
        }
      }
      if (position.x + 1 < BOARD_SIZE) {
        const attackPos2 = boardState[position.x + 1][position.y + movement];
        if (attackPos2.piece) {
          possibleMoves.push(attackPos2);
        }
      }
    }

    return filterPossibleMoves(this.playerColor, possibleMoves);
  }
}
