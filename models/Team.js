const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
// const User = require('./User');


const teamSchema = new Schema({
  // players: [{type: Schema.Types.ObjectId}],
  players: [],
  Creator: String,
  avatar: String,
  teamName: String,
  needMembers: Boolean,
  wins: Number,
  losses: Number,
  draws: Number,
  league: String,
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;



