import { Component, OnInit } from "@angular/core";
import { BoardTile } from "../models/board-tile";
import { createBoard } from "../models/utils/game-utils";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.sass"]
})
export class BoardComponent implements OnInit {
  private letterBorder: string[] = [];
  private numberBorder: number[] = [];

  public board: BoardTile[][] = [];

  constructor() {
    this.board = createBoard();
  }

  ngOnInit() {}
}
