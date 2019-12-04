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
    board[i] = new Array(BOARD_SIZE);
    for (let j = 0; j < BOARD_SIZE; j++) {
      switch (j) {
        case 0:
          switch (i) {
            case 0:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Rook(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 1:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Knight(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 2:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Bishop(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 3:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new King(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 4:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Queen(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;
            case 5:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Bishop(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 6:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Knight(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 7:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Rook(PlayerColor.Black),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            default:
              break;
          }
          break;

        case 1:
          board[i][j] = {
            id: i * BOARD_SIZE + j,
            position: { x: i, y: j },
            piece: new Pawn(PlayerColor.Black),
            isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
          };
          break;

        case 6:
          board[i][j] = {
            id: i * BOARD_SIZE + j,
            position: { x: i, y: j },
            piece: new Pawn(PlayerColor.White),
            isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
          };
          break;

        case 7:
          switch (i) {
            case 0:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Rook(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 1:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Knight(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 2:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Bishop(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 3:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new King(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 4:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Queen(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 5:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Bishop(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 6:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Knight(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            case 7:
              board[i][j] = {
                id: i * BOARD_SIZE + j,
                position: { x: i, y: j },
                piece: new Rook(PlayerColor.White),
                isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
              };
              break;

            default:
              break;
          }
          break;

        default:
          board[i][j] = {
            id: i * BOARD_SIZE + j,
            position: { x: i, y: j },
            piece: null,
            isBlack: i % 2 === 0 ? j % 2 !== 0 : j % 2 === 0
          };
          break;
      }
    }
  }

  return board;
}
