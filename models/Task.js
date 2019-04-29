const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// pomodoro schema

// Desc
/*

  Schema for pomodoro task

  objective - what you are trying to do
  googleid - which user it is tied to
  timer - default 25 min
  completed - did you finish what you wanted to do
  rating - grade yourself of your performance 0-100
  note - anything notable
  date - automatically inserted
*/
const TaskSchema = new Schema({
  objective: {
    type: String,
    required: true
  },
  timer: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    required: true
  },
  rating: {
    type: Number,
    required: true
  },
  note: {
    type: String,
    required: false
  },
  googleId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Task = mongoose.model('task', TaskSchema);