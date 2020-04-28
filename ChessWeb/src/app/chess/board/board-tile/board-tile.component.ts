import { Component, EventEmitter, Output, Input } from "@angular/core";
import { BoardTile } from "../../models/board-tile";

@Component({
  selector: "app-board-tile",
  templateUrl: "./board-tile.component.html",
  styleUrls: ["./board-tile.component.sass"],
})
export class BoardTileComponent {
  @Input()
  public tile: BoardTile = null;
  @Output()
  public tileClicked: EventEmitter<BoardTile> = new EventEmitter<BoardTile>();

  public onSelect() {
    this.tileClicked.emit(this.tile);
  }
}
