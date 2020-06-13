import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";

import { ChessRoutingModule } from "./chess-routing.module";
import { SingleplayerComponent } from "./singleplayer/singleplayer.component";
import { BoardComponent } from "./board/board.component";
import { BoardTileComponent } from "./board/board-tile/board-tile.component";
import { MultiplayerComponent } from "./multiplayer/multiplayer.component";

@NgModule({
  declarations: [
    SingleplayerComponent,
    BoardComponent,
    BoardTileComponent,
    MultiplayerComponent,
  ],
  imports: [CommonModule, ChessRoutingModule, FlexLayoutModule],
  exports: [
    SingleplayerComponent,
    MultiplayerComponent,
    BoardComponent,
    BoardTileComponent,
  ],
})
export class ChessModule {}
