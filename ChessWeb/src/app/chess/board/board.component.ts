import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BoardTile } from "../models/board-tile";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.sass"],
})
export class BoardComponent {
  @Input()
  public board: BoardTile[][] = [];
  @Output()
  public tileSelect: EventEmitter<BoardTile> = new EventEmitter<BoardTile>();

  public onTileSelect(tile: BoardTile) {
    this.tileSelect.emit(tile);
  }
}
