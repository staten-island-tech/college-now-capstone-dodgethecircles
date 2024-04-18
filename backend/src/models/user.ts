import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

const user = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tokens: {
      type: Array,
      default: [],
    },
    highscore: {
      type: Number,
      default: 0,
    },
    pfp: {
      type: Buffer,
      contentType: String,
      default: "default_pfp.svg",
    },
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

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
