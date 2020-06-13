import { Injectable } from "@angular/core";
import * as signalR from "@aspnet/signalr";
import { Highscore } from "../high-scores/highscore";

@Injectable({
  providedIn: "root",
})
export class SignalRService {
  public broadcasted: Highscore;
  public highscore: Highscore;
  public highscores: Highscore[];

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      //.withUrl('https://chessdatabasebackendapi.azurewebsites.net/chart')
      .withUrl("https://localhost:44355/chart")
      .build();

    this.hubConnection
      .start()
      .then(() => console.log("Connection started"))
      .catch((err) => console.log("Error while starting connection: " + err));
  };

  public sendHighscore(highscore: Highscore) {
    this.hubConnection
      .invoke("broadcasthighscore", highscore)
      .catch((err) => console.error(err));
  }

  public addBroadcastHighscoreListener = () => {
    this.hubConnection.on("broadcasthighscore", (data) => {
      this.broadcasted = data;
    });
  };

  public addTransferChartDataListener = () => {
    this.hubConnection.on("transferhighscores", (data) => {
      this.highscores = data;
    });
  };
}
