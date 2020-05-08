import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges
} from "@angular/core";
import { BoardTile } from "../../models/board-tile";

@Component({
  selector: "app-board-tile",
  templateUrl: "./board-tile.component.html",
  styleUrls: ["./board-tile.component.sass"]
})
export class BoardTileComponent implements OnChanges {
  public selected = false;
  public moveable = false;

  @Input()
  public tile: BoardTile = null;
  @Input()
  public possibleMoves: BoardTile[] = [];
  @Input()
  public selectedTile: BoardTile = null;
  @Output()
  public tileClicked: EventEmitter<BoardTile> = new EventEmitter<BoardTile>();

  public onSelect() {
    this.tileClicked.emit(this.tile);
  }

  ngOnChanges() {
    if (this.selectedTile) {
      this.selected = this.selectedTile.id === this.tile.id ? true : false;
    } else {
      this.selected = false;
    }

    if (this.possibleMoves) {
      const contained = this.possibleMoves.filter(
        move => move.id === this.tile.id
      );
      this.moveable = contained.length > 0 ? true : false;
    } else {
      this.moveable = false;
    }
  }
}
