import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const user = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: false,
      },
    },
  ],
});

user.methods.returnData = function () {
  return {
    username: this.username,
    tokens: this.tokens,
  };
};

user.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});
user.methods.comparePassword = function (passw: string, cb: Function) {
  bcrypt.compare(passw, this.password, function (err, isMatch) {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

export default mongoose.model("User", user);
