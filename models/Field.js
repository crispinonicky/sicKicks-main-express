const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Team = require('./Team');


const fieldSchema = new Schema({
  location: String,
  fieldName: String,
  time: String,
  // matchType: String,
  price: Number,
  // teamsPlaying: [{type: Schema.Types.ObjectId}],
  teamsPlaying: [],
  homeTeam: String,
  awayTeam: String,
  details: String,
  avatar: {type: String, default: "http://profilepicturesdp.com/wp-content/uploads/2018/06/default-user-profile-picture-6.png"}
  // comments: [Object],
});

const Field = mongoose.model("Field", fieldSchema);

module.exports = Field;

