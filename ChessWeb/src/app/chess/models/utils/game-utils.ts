import { Pawn } from "../pieces/pawn";
import { Bishop } from "../pieces/bishop";
import { Rook } from "../pieces/rook";
import { Knight } from "../pieces/knight";
import { King } from "../pieces/king";
import { Queen } from "../pieces/queen";
import { BoardTile } from "../board-tile";
import { PlayerColor } from "../chess-piece";

export const BOARD_SIZE = 8;

export function createBoard(): BoardTile[][] {
  const board: BoardTile[][] = [];

  for (let i = 0; i < BOARD_SIZE; i++) {
    for (let j = 0; j < BOARD_SIZE; j++) {
      switch (j) {
        case 0:
          switch (i) {
            case 0 || 7:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Rook(PlayerColor.Black)
              };
              break;

            case 1 || 6:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Knight(PlayerColor.Black)
              };
              break;

            case 2 || 5:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Bishop(PlayerColor.Black)
              };
              break;

            case 3:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new King(PlayerColor.Black)
              };
              break;

            case 4:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Queen(PlayerColor.Black)
              };
              break;

            default:
              break;
          }
          break;

        case 1:
          board[i][j] = {
            position: { x: i, y: j },
            piece: new Pawn(PlayerColor.Black)
          };
          break;

        case 6:
          board[i][j] = {
            position: { x: i, y: j },
            piece: new Pawn(PlayerColor.White)
          };
          break;

        case 7:
          switch (i) {
            case 0 || 7:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Rook(PlayerColor.White)
              };
              break;

            case 1 || 6:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Knight(PlayerColor.White)
              };
              break;

            case 2 || 5:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Bishop(PlayerColor.White)
              };
              break;

            case 3:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new King(PlayerColor.White)
              };
              break;

            case 4:
              board[i][j] = {
                position: { x: i, y: j },
                piece: new Queen(PlayerColor.White)
              };
              break;

            default:
              break;
          }
          break;

        default:
          board[i][j] = { position: { x: i, y: j }, piece: null };
          break;
      }
    }
  }

  return board;
}
