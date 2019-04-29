const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// UserProfile schema

// Desc
/*
  Schema for UserProfile

  firstName
  lastName
  googleId - what google gives me
  email
  name
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
  },
  email: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
});

module.exports = UserProfile = mongoose.model('userprofile', UserProfileSchema);