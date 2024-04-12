import mongoose from "mongoose";

const { Schema } = mongoose;

const code = mongoose.Types.ObjectId;

const room = new Schema({
  code: code.generate(),
  players: Number,
  host: String,
  otherPlayers: String, // don't know if this is the right type
  messageType: String,
});

export default mongoose.model("Room", room);
