import mongoose from "mongoose";

const { Schema } = mongoose;

const file = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

file.pre("save", async function (next) {
  next();
});

// export schema
export default mongoose.model("File", file);
