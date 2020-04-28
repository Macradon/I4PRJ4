import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";

import { ChessRoutingModule } from "./chess-routing.module";
import { GameComponent } from "./single-player/single-player.component";
import { BoardComponent } from "./board/board.component";
import { BoardTileComponent } from "./board/board-tile/board-tile.component";

@NgModule({
  declarations: [GameComponent, BoardComponent, BoardTileComponent],
  imports: [CommonModule, ChessRoutingModule, FlexLayoutModule],
  exports: [GameComponent, BoardComponent, BoardTileComponent]
})
export class ChessModule {}
