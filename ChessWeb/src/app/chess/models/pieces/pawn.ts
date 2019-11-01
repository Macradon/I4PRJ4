import { ChessPiece, PlayerColor } from "../chess-piece";
import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { filterPossibleMoves, BOARD_SIZE } from "../utils";

export class Pawn implements ChessPiece {
  playerColor: PlayerColor;
  pictureURL: string;
  position: BoardPosition;
  firstMove: boolean = true;

  constructor(player: PlayerColor, position: BoardPosition) {
    this.playerColor = player;
    this.position = position;
  }

  getAvailableMoves(boardState: BoardTile[][]): BoardTile[] {
    const possibleMoves: BoardTile[] = [];

    const movement = this.playerColor == PlayerColor.White ? 1 : -1;

    const forwardTile =
      this.position.y + movement < BOARD_SIZE
        ? boardState[this.position.x][this.position.y + movement]
        : null;
    if (forwardTile) {
      if (this.firstMove && !forwardTile.piece) {
        possibleMoves.push(
          boardState[this.position.x][this.position.y + movement * 2]
        );
      }

      possibleMoves.push(forwardTile);

      if (this.position.x - 1 >= 0) {
        const attackPos1 =
          boardState[this.position.x - 1][this.position.y + movement];
        if (attackPos1.piece) {
          possibleMoves.push(attackPos1);
        }
      }
      if (this.position.x + 1 < BOARD_SIZE) {
        const attackPos2 =
          boardState[this.position.x + 1][this.position.y + movement];
        if (attackPos2.piece) {
          possibleMoves.push(attackPos2);
        }
      }
    }

    return filterPossibleMoves(this.playerColor, possibleMoves);
  }
}
