import mongoose from "mongoose";

const { Schema } = mongoose;

const score = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  value: {type: Number, required: true},
});

export default mongoose.model("Score", score);