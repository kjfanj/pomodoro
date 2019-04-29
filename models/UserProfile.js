const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserProfile schema

// Desc
/*

  Schema for UserProfile

  username
  googleId - what google gives me
*/
const UserProfileSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  }
});

module.exports = UserProfile = mongoose.model('userprofile', UserProfileSchema);