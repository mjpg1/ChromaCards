const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema(
//   {
//     username: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     progress: {},
//   },
//   { minimize: false }
// );

const userSchema = new mongoose.Schema(
  {
    given_name: String,
    family_name: String,
    email: String,
    googleID: { type: Number, required: true, unique: true },
    progress: {},
  },
  { minimize: false }
);

module.exports = mongoose.model('User', userSchema);
