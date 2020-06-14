import { BoardTile } from "./board-tile";

export interface Move {
  from: BoardTile;
  to: BoardTile;
}
