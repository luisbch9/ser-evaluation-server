import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
  },
  {
    // versionKey: false,
    timestamps: true,
  }
);

usuarioSchema.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

usuarioSchema.methods.isValidPassword = async function (password) {
  const user = this;
  const compare = await bcrypt.compare(password, user.password);

  return compare;
};

export default model("User", usuarioSchema);
