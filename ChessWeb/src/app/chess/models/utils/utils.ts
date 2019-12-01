import { BoardPosition } from "../board-position";
import { BoardTile } from "../board-tile";
import { PlayerColor } from "../chess-piece";
import { Pawn } from "../pieces/pawn";
import { Bishop } from "../pieces/bishop";
import { Rook } from "../pieces/rook";
import { Knight } from "../pieces/knight";
import { King } from "../pieces/king";
import { Queen } from "../pieces/queen";

export const BOARD_SIZE = 8;

export enum Direction {
  NORTH,
  NORTHEAST,
  EAST,
  SOUTHEAST,
  SOUTH,
  SOUTHWEST,
  WEST,
  NORTHWEST
}

export function filterPossibleMoves(
  color: PlayerColor,
  posMoves: BoardTile[]
): BoardTile[] {
  return posMoves.filter(
    tile => !tile.piece || tile.piece.playerColor !== color
  );
}

export function availableMovesInDirection(
  position: BoardPosition,
  direction: Direction,
  boardState: BoardTile[][]
) {
  const player: PlayerColor =
    boardState[position.x][position.y].piece.playerColor;
  const result: BoardTile[] = [];

  switch (direction) {
    case Direction.NORTH: {
      for (let i = 1; i < BOARD_SIZE - position.y; i++) {
        const tile: BoardTile = boardState[position.x][position.y + i];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
    case Direction.NORTHEAST: {
      const highestPos = position.x > position.y ? position.x : position.y;
      for (let i = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x + i][position.y + i];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
    case Direction.EAST: {
      for (let i = 1; i < BOARD_SIZE - position.x; i++) {
        const tile: BoardTile = boardState[position.x + i][position.y];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
    case Direction.SOUTHEAST: {
      const highestPos = position.x > position.y ? position.x : position.y;
      for (let i = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x + i][position.y - i];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
    case Direction.SOUTH: {
      for (let i = 1; i < BOARD_SIZE - position.y; i++) {
        const tile: BoardTile = boardState[position.x][position.y - i];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
    case Direction.SOUTHWEST: {
      const highestPos = position.x > position.y ? position.x : position.y;
      for (let i = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x - i][position.y - i];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
    case Direction.WEST: {
      for (let i = 1; i < BOARD_SIZE - position.y; i++) {
        const tile: BoardTile = boardState[position.x - i][position.y];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
    case Direction.NORTHWEST: {
      const highestPos = position.x > position.y ? position.x : position.y;
      for (let i = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x - i][position.y + i];
        if (tile.piece) {
          if (tile.piece.playerColor === player) {
            break;
          } else {
            result.push(tile);
            break;
          }
        } else {
          this.result.push(tile);
        }
      }
      break;
    }
  }
  return result;
}

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
