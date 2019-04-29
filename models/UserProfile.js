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
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  googleId: {
    type: String,
    required: true
  }
});

module.exports = UserProfile = mongoose.model('userprofile', UserProfileSchema);