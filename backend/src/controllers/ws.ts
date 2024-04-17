import { WebSocket } from "ws";
import {} from "express-ws";

export function wsConnect(ws: WebSocket, req: any) {
  ws.on("message", (msg: string) => {
    let data = JSON.parse(msg);
    switch (data.type) {
      case "message":
        ws.send(msg);
        break;
      case "join":
        ws.send(msg);
        break;
      case "temp":
        ws.send(msg);
        console.log("hi");
        break;
      default:
        ws.send(msg);
        break;
    }
    ws.send(msg);
  });
}
