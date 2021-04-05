import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  userName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    // to be done later with date
    type: Number,
    required: true,
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
  },
  password: {
    type: String,
    required: true,
    maxLength: 1024, // cuz gonna be hashed
  },
});

userSchema.statics.findByEmail = async (email) => {
  return await User.findOne({ email });
};

userSchema.methods.generateJWT = async function () {
  return await jwt.sign(
    { _id: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7 days" }
  );
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.__v;
  return userObject;
};

userSchema.pre("save", async function (next) {
  const user = this;
  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_WORK_FACTOR));
  user.password = await bcrypt.hash(user.password, salt);
  next();
});

export const User = mongoose.model("User", userSchema);
