const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Team = require('./Team');


const teamSchema = new Schema({
  location: String,
  fieldName: String,
  time: String,
  matchType: String,
  price: Number,
  teamsPlaying: [{type: String, ref: 'Team'}],
  comments: [String],
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;

