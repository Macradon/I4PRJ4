import { BoardPosition } from './board-position';
import { ChessPiece } from './chess-piece';

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
  boardState: ChessPiece[][]
) {
  switch (direction) {
    case Direction.NORTH: {
      break;
    }
    case Direction.NORTHEAST: {
      break;
    }
    case Direction.EAST: {
      break;
    }
    case Direction.SOUTHEAST: {
      break;
    }
    case Direction.SOUTH: {
      break;
    }
    case Direction.SOUTHWEST: {
      break;
    }
    case Direction.WEST: {
      break;
    }
    case Direction.NORTHWEST: {
      break;
    }
  }
}
