import mongoose from "mongoose";

const { Schema } = mongoose;

const user = new Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
});

// export schema
export default mongoose.model("User", user);
