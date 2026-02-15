import mongoose from "mongoose";

const userSchima = new mongoose.Schema({
  userName : {
    type : String,
    required : true,
    unique : true,
    trim : true
  },
  email : {
    type : String,
    unique : true,
    required : true,
    trim : true
  },
  password : {
    type : String,
    required : true,
    trim : true
  },
  role: {
    type: String,
    enum: ["user","admin"],
    default:"user"
  }
}, {timestamps: true});

export const User = mongoose.model("User", userSchima);