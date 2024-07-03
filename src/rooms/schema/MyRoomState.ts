import { MapSchema, Schema, Context, type } from "@colyseus/schema";

export class MyRoomState extends Schema {

  @type("string") text: string = "";
  @type("string") colors: string = "";
  @type({ map: "string" }) playerColors = new MapSchema<string>()

}
