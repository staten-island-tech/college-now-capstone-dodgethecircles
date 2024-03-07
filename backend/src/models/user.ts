import mongoose from "mongoose";

const { Schema } = mongoose;

const user = new Schema({
  name: String,
});

// export schema
export default mongoose.model("User", user);
