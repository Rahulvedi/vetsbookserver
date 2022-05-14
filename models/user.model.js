const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      unique: true,
    },
    phonenumber: {
      type: Number,
      unique: true,
    },
    gender: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    address: {
      type: String,
    },
    profilepicture: {
      type: String,
    },
    password: {
      type: String,
    },
    city: {
      type: String,
    },
    state:{
      type:String
    },
    country: {
      type: String,
      default:"India"
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;