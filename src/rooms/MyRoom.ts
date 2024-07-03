import { Room, Client } from "@colyseus/core";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 4;

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage("addLetter", (client, message) => {
      this.state.text += message.txt
      this.state.colors += this.state.playerColors.get(client.sessionId)
    });
  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
    this.state.playerColors.set(client.sessionId, "rgb".charAt(Math.random() * 3))
  }

  onLeave (client: Client, consented: boolean) {
    this.state.playerColors.delete(client.sessionId);
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
