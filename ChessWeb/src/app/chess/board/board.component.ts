import { Component, Input, Output, EventEmitter } from "@angular/core";
import { BoardTile } from "../models/board-tile";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.sass"]
})
export class BoardComponent {
  public letterBorder: string[] = ["A", "B", "C", "D", "E", "F", "G", "H"];
  public numberBorder: number[] = [8, 7, 6, 5, 4, 3, 2, 1];

  @Input()
  public board: BoardTile[][] = [];
  @Input()
  public possibleMoves: BoardTile[] = [];
  @Input()
  public selectedTile: BoardTile = null;

  @Output()
  public tileSelect: EventEmitter<BoardTile> = new EventEmitter<BoardTile>();

  public onTileSelect(tile: BoardTile) {
    this.tileSelect.emit(tile);
  }
}
