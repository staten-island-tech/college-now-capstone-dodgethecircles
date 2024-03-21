// create model for game room

import mongoose from "mongoose";

const { Schema } = mongoose;

const code = mongoose.Types.ObjectId;

const room = new Schema({
  location: String, // maybe references _id of the model id
  code: code.generate(),
  players: Number,
  host: String,
  otherPlayers: Array<Object>, // don't know if this is the right type
  messageType: String,
});

export default mongoose.model("Room", room);
