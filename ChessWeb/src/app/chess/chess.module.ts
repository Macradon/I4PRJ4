import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChessRoutingModule } from "./chess-routing.module";
import { GameComponent } from "./game/game.component";
import { BoardComponent } from "./board/board.component";
import { BoardTileComponent } from "./board/board-tile/board-tile.component";

@NgModule({
  declarations: [GameComponent, BoardComponent, BoardTileComponent],
  imports: [CommonModule, ChessRoutingModule],
  exports: [GameComponent, BoardComponent, BoardTileComponent]
})
export class ChessModule {}
