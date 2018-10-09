const mongoose = require("mongoose");
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String,
  email: String,
  videos: String,
  summary: String,
  playerPosition: String,
  favoriteClub: String,
  avatar: {type: String, default: "http://profilepicturesdp.com/wp-content/uploads/2018/06/default-user-profile-picture-6.png"}
  // followers: Number,
  // following: Number,
});

const User = mongoose.model("User", userSchema);

module.exports = User;



