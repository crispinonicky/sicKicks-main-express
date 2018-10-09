const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const User = require('./User');


const teamSchema = new Schema({
  // players: [{type: Schema.Types.ObjectId}],
  players: [],
  Creator: String,
  avatar: {type: String, default: "http://profilepicturesdp.com/wp-content/uploads/2018/06/default-user-profile-picture-6.png"},
  teamName: String,
  needMembers: Boolean,
  wins: Number,
  losses: Number,
  draws: Number,
  league: String,
  details: String
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;



