import { BoardPosition } from "./board-position";
import { BoardTile } from "./board-tile";
import { PlayerColor } from "./chess-piece";

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

export function availableMovesInDirection(
  position: BoardPosition,
  direction: Direction,
  boardState: BoardTile[][]
) {
  const player: PlayerColor = boardState[position.x][position.y].piece.player;
  const result: BoardTile[] = [];

  switch (direction) {
    case Direction.NORTH: {
      for (let i: number = 1; i < BOARD_SIZE - position.y; i++) {
        const tile: BoardTile = boardState[position.x][position.y + i];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
      for (let i: number = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x + i][position.y + i];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
      for (let i: number = 1; i < BOARD_SIZE - position.x; i++) {
        const tile: BoardTile = boardState[position.x + i][position.y];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
      for (let i: number = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x + i][position.y - i];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
      for (let i: number = 1; i < BOARD_SIZE - position.y; i++) {
        const tile: BoardTile = boardState[position.x][position.y - i];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
      for (let i: number = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x - i][position.y - i];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
      for (let i: number = 1; i < BOARD_SIZE - position.y; i++) {
        const tile: BoardTile = boardState[position.x - i][position.y];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
      for (let i: number = 1; i < BOARD_SIZE - highestPos; i++) {
        const tile: BoardTile = boardState[position.x - i][position.y + i];
        if (tile.piece) {
          if (tile.piece.player == player) {
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
