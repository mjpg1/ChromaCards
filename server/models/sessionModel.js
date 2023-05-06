const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  _id: { type: String },
  session: { type: String, unique: true },
  expires: { type: Date },
});

module.exports = mongoose.model('Session', sessionSchema);

// https://www.reddit.com/r/node/comments/m1ek0y/mongostore_session_how_does_it_work_how_to/
