import mongoose, { Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "video",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10); //bcrypt.hash(hashing_var_name, number_of_hashing_round)
  next();
}); //dont use arro function because we dont have reference of this in arrow function

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); //return boolean value
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({
    _id: this.id,
    email : this.email,
    username : this.username,
    fullName : this.fullName
  },
  process.env.ACCESS_TOKEN,
  {
    expiresIn : process.env.ACCESS_TOKEN_EXPIRY
  }

  );
};
userSchema.methods.generateRefreshToken = function () {
        return jwt.sign(
            {
                _id:this._id
            },process.env.REFRESH_TOKEN,
            {
                expiresIn: process.env.REFRESH_TOKEN_EXPIRY
            }
        )
};

export const User = mongoose.model("User", userSchema);
