import { Injectable, EventEmitter } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { ColorDTO } from "../chess/models/colorDTO";
import { Move } from "../chess/models/move";

@Injectable({
  providedIn: "root",
})
export class GameSignalRService {
  private gameConnection: signalR.HubConnection;
  public connection = new EventEmitter<string>();
  public queued = new EventEmitter<ColorDTO>();
  public gameBegin = new EventEmitter<string>();
  public moveReceived = new EventEmitter<Move>();

  public startConnection = () => {
    this.gameConnection = new signalR.HubConnectionBuilder()
      .withUrl("https://chessdatabasebackendapi.azurewebsites.net/games")
      //.withUrl("https://localhost:44355/games")
      .build();

    this.gameConnection
      .start()
      .then(() => {
        console.log("Game connection started");
        this.registerEventEmitters();
      })
      .catch((err) => console.log("Error while starting connection: " + err));
  };

  public findOpenGameRoom(connectionId: string) {
    this.gameConnection
      .invoke("findOpenGameRoom", connectionId)
      .catch((err) => console.error(err));
  }

  public sendMove(gameRoom: string, move: Move) {
    this.gameConnection
      .invoke("sendMove", gameRoom, JSON.stringify(move))
      .catch((err) => console.error(err));
  }

  private registerEventEmitters() {
    this.gameConnection.on("ConnectedToGameHub", (data) => {
      this.connection.emit(data);
    });
    this.gameConnection.on("QueuedForGame", (data) => {
      this.queued.emit(data);
    });
    this.gameConnection.on("BeginGame", (data) => {
      this.gameBegin.emit(data);
    });

    this.gameConnection.on("Move", (data) => {
      this.moveReceived.emit(JSON.parse(data));
    });
  }
}
