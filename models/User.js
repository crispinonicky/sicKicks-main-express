const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  videos: String,
  playerPosition: String,
  favoriteClub: String,
  followers: Number,
  following: Number,
  avatar: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;



