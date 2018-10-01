const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const User = require('./User');


const teamSchema = new Schema({
  players: [{type: String, ref: 'User'}],
  Creator: {type: String, ref: 'User'},
  avatar: String,
  teamName: String,
  needMembers: Boolean,
  record: String,
  league: String,
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;



